import React from 'react';
import { useLocation } from 'react-router-dom';
import SuiteInstability from '../components/graphs/SuiteInstability';
import StatusCount from '../components/graphs/StatusCount';

const Dashboard = () => {
    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    return (
        <>
            {/* <SuiteInstability /> */}
            {buildUrl && <StatusCount />}
        </>
    );
};

export default Dashboard;
