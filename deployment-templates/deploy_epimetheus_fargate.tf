terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

locals {
  postgres_password="testingthearchive"
  postgres_username="testarchiver"
}

resource "aws_vpc" "epimetheus_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = "true"
}

resource "aws_subnet" "epimetheus_subnet1" {
  vpc_id     = aws_vpc.epimetheus_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "eu-west-1b"
  tags = {
    Name = "epimetheus_subnet1"
  }
}

resource "aws_subnet" "epimetheus_subnet2" {
  vpc_id     = aws_vpc.epimetheus_vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "eu-west-1c"
  tags = {
    Name = "epimetheus_subnet2"
  }
}

resource "aws_internet_gateway" "epimetheus_vpc_gateway" {
  vpc_id = aws_vpc.epimetheus_vpc.id

  tags = {
    Name = "epimetheus_vpc_gateway"
  }
}

resource "aws_route_table" "epimetheus_route_table" {
  vpc_id = aws_vpc.epimetheus_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.epimetheus_vpc_gateway.id
  }

}

resource "aws_main_route_table_association" "epimetheus_vpc_route_table" {
  vpc_id         = aws_vpc.epimetheus_vpc.id
  route_table_id = aws_route_table.epimetheus_route_table.id

}

resource "aws_route_table_association" "subnet1_association" {
  subnet_id      = aws_subnet.epimetheus_subnet1.id
  route_table_id = aws_route_table.epimetheus_route_table.id
}

resource "aws_route_table_association" "subnet2_association" {
  subnet_id      = aws_subnet.epimetheus_subnet2.id
  route_table_id = aws_route_table.epimetheus_route_table.id
}

resource "aws_security_group" "allow_basic_networking" {
  name        = "allow ssh, http and ssl"
  vpc_id      = aws_vpc.epimetheus_vpc.id
  
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    ="-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_postgresql" {
  name        = "allow_postgresql"
  description = "Allow Postgresql inbound traffic from all sources"
  vpc_id      = aws_vpc.epimetheus_vpc.id

  ingress {
    description = "TLS from VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_tls"
  }
}

resource "aws_db_subnet_group" "testarchiver_subnet_group" {
  name       = "testarchiver_subnet_group"
  subnet_ids = [aws_subnet.epimetheus_subnet1.id,aws_subnet.epimetheus_subnet2.id]

  tags = {
    Name = "testarchiver_subnet_group"
  }
}

resource "aws_db_instance" "testarchiver_db" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "12.3"
  instance_class       = "db.t2.micro"
  name                 = "testarchiverdb"
  username             = local.postgres_username
  password             = local.postgres_password
  db_subnet_group_name = "testarchiver_subnet_group"
  publicly_accessible  = "true"
  skip_final_snapshot  = "true"
  vpc_security_group_ids = [aws_security_group.allow_postgresql.id]
}


resource "aws_ecs_cluster" "epimetheus_cluster" {
  name = "epimetheus_cluster"
  capacity_providers = ["FARGATE"]
}

resource "aws_ecs_service" "epimetheus_service" {
  name            = "epimetheus_service"
  cluster         = aws_ecs_cluster.epimetheus_cluster.id
  task_definition = aws_ecs_task_definition.epimetheus_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = [aws_subnet.epimetheus_subnet1.id,aws_subnet.epimetheus_subnet2.id]
    assign_public_ip = true
    security_groups = [aws_security_group.allow_basic_networking.id]
  }
}

resource "aws_iam_role" "epimetheus_task_execution_role" {
  name = "role-name"
 
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_role" "epimetheus_task_role" {
  name = "role-name-task"
 
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}
 
resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.epimetheus_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
resource "aws_iam_role_policy_attachment" "task_s3" {
  role       = aws_iam_role.epimetheus_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSReadOnlyAccess"
}

resource "aws_ecs_task_definition" "epimetheus_task" {
  family                = "service"
  container_definitions = <<TASK_DEFINITION
[
  {
    "name": "epimetheus-frontend",
    "image": "siilisalabs/epimetheus-frontend",
    "essential": true,
    "environment": [
      { 
        "name" : "BACKEND_URL", 
        "value" : "http://localhost:5000"
      }
    ],
    "portMappings": [
      {
        "containerPort": 8080,
        "hostPort": 8080
      }
    ]
  },
  {
    "name": "epimetheus-backend",
    "image": "siilisalabs/epimetheus-backend",
    "essential": true,
    "environment": [
      { 
        "name" : "HOST", 
        "value" : "${aws_db_instance.testarchiver_db.address}"
      },
      { 
        "name" : "DATABASE", 
        "value" : "postgres"
      },
      { 
        "name" : "USER", 
        "value" : "${local.postgres_username}"
      },
      { 
        "name" : "PASSWORD", 
        "value" : "${local.postgres_username}"
      },
      { 
        "name" : "PORT", 
        "value" : "5000"
      }
    ],
    "portMappings": [
      {
        "containerPort": 5000,
        "hostPort": 5000
      }
    ]
  }
]

TASK_DEFINITION
  task_role_arn = aws_iam_role.epimetheus_task_role.arn
  execution_role_arn       = aws_iam_role.epimetheus_task_execution_role.arn
  requires_compatibilities = ["FARGATE"]
  cpu = "256"
  memory = "1024"
  network_mode = "awsvpc"
  depends_on = [
    aws_db_instance.testarchiver_db,
  ]
}




