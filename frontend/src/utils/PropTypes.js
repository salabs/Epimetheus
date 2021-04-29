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

export const testsPropType = PropTypes.shape({
    elapsed: PropTypes.number,
    execution_elapsed: PropTypes.number,
    execution_fingerprint: PropTypes.string,
    execution_status: PropTypes.string,
    failure_log_level: PropTypes.string,
    failure_message: PropTypes.string,
    failure_timestamp: PropTypes.string,
    fingerprint: PropTypes.string,
    full_name: PropTypes.string,
    id: PropTypes.number,
    log_messages: PropTypes.arrayOf(
        PropTypes.shape({
            execution_path: PropTypes.string,
            id: PropTypes.number,
            log_level: PropTypes.string,
            message: PropTypes.string,
            suite_id: PropTypes.number,
            test_id: PropTypes.number,
            test_run_id: PropTypes.number,
            timestamp: PropTypes.string,
        })
    ),
    name: PropTypes.string,
    setup_elapsed: PropTypes.number,
    setup_fingerprint: PropTypes.string,
    setup_status: PropTypes.string,
    start_time: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.array,
    teardown_elapsed: PropTypes.string,
    teardown_fingerprint: PropTypes.string,
    teardown_status: PropTypes.string,
    test_run_id: PropTypes.number,
});
