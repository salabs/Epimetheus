import React from 'react';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';

const Dashboard = () => {
    const { buildId } = useParams();

    const correctStatus = () => (buildId ? 'build' : 'series');

    return (
        <div>
            <BreadcrumbNav status={correctStatus()} />
            Dashboard
        </div>
    );
};

export default Dashboard;
