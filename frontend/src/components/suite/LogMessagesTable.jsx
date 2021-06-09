import React from 'react';
import { testsPropType } from '../../utils/PropTypes';
import SuiteLogMessage from './SuiteLogMessage';
import SvgIcon from '../../images/SvgIcon';
import { LogRow, InfoLevel } from './LogMessagesTable.styles';
import { Table } from '../table/Table';

const LogMessagesTable = ({ test }) => {
    return test ? (
        <Table tableId="logMessages-table">
            <thead>
                <tr>
                    <th className="tableLogLevel">Level</th>
                    <th className="tableMessage">Log message</th>
                    <th className="tableTimeStamp">Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {test.log_messages !== null &&
                    test.log_messages.map(
                        ({ log_level, message, timestamp }, i) => {
                            return (
                                <LogRow key={i} log_level={log_level}>
                                    <InfoLevel>
                                        {log_level}
                                        {log_level === 'FAIL' ? (
                                            <span>
                                                <SvgIcon svg="fail-white" />
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </InfoLevel>
                                    <td className="suite-log-message">
                                        <SuiteLogMessage message={message} />
                                    </td>
                                    <td>
                                        <div className="table-item">
                                            {timestamp}
                                        </div>
                                    </td>
                                </LogRow>
                            );
                        }
                    )}
            </tbody>
        </Table>
    ) : null;
};

LogMessagesTable.propTypes = {
    test: testsPropType.isRequired,
};

export default LogMessagesTable;
