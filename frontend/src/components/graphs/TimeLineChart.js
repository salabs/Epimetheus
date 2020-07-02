import React from 'react';
import { isEmpty } from 'ramda';
import { useStateValue } from '../../contexts/state';

const TimeLineChart = ({ history }) => {
    const [
        {
            parentData: { buildData },
        },
    ] = useStateValue();

    const buildNumberList =
        buildData &&
        Array.from(Array(buildData.build_number), (_, i) => i + 1).reverse();

    const testList =
        history &&
        history.history
            .flatMap(data => data.test_cases)
            .filter(build => !isEmpty(build))
            .flatMap(x => x.builds);
    console.log('testList', testList);

    const numberOfTestsWithStatus = status => {
        return (
            buildNumberList &&
            testList &&
            buildNumberList.map(buildNumber => {
                const tests = testList.filter(
                    t => t.build_number === buildNumber && t.status === status
                );

                return tests.length;
            }, [])
        );
    };

    const passed = numberOfTestsWithStatus('PASS');
    console.log('passed', passed);
    const failed = numberOfTestsWithStatus('FAIL');
    console.log('failed', failed);

    return <div>TimeLineChart</div>;
};

export default TimeLineChart;
