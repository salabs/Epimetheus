import React from 'react';
import SuiteLogMessage from './SuiteLogMessage';
import { ReactComponent as Fail } from '../../images/fail-white.svg';
import { LogRow, InfoLevel } from './LogMessages.styles';
import { Table } from '../table/Table';

const LogMessages = ({ test }) => {
    return test ? (
        <Table table-id="logMessages-table">
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
                                                <Fail />
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </InfoLevel>
                                    <td className="suite-log-message">
                                        <SuiteLogMessage message={message} />
                                    </td>
                                    <td>
                                        <div
                                            className="table-item"
                                            title={timestamp}
                                        >
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

export default LogMessages;
