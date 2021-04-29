import PropTypes from 'prop-types';

export const buildPropType = PropTypes.shape({
    build_number: PropTypes.number,
    elapsed: PropTypes.number,
    failure_log_level: null,
    failure_message: null,
    failure_timestamp: null,
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            log_level: PropTypes.string,
            message: PropTypes.string,
        })
    ),
    start_time: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.array,
    test_run_id: PropTypes.number,
    test_run_time: PropTypes.number,
    test_status: PropTypes.string,
});

export const testCasePropType = PropTypes.arrayOf(
    PropTypes.shape({
        builds: PropTypes.arrayOf(buildPropType),
        full_name: PropTypes.string,
        name: PropTypes.string,
        test_case: PropTypes.string,
        test_id: PropTypes.number,
    })
);

export const historyPropType = PropTypes.arrayOf(
    PropTypes.shape({
        full_name: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        repository: PropTypes.string,
        suite: PropTypes.string,
        suite_full_name: PropTypes.string,
        suite_id: PropTypes.number,
        test_cases: testCasePropType,
    })
);
