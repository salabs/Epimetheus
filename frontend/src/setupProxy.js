// https://create-react-app.dev/docs/proxying-api-requests-in-development/

const proxy = require('http-proxy-middleware');

let server_url = process.env.REACT_APP_SERVER_URL || 'localhost';
let server_port = process.env.REACT_APP_FRONT_END_PORT || '5050';

module.exports = function(app) {
    app.use(
        '/data',
        proxy({
            target: 'http://' + server_url + ':' + server_port,
            changeOrigin: true,
        })
    );
};
