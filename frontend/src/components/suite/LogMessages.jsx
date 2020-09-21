import React from 'react';
import SuiteLogMessage from '../SuiteLogMessage';
import { ReactComponent as Fail } from '../../images/fail-white.svg';
import {
    SelectedTestContainer,
    FlexGrowColumn,
    LogRow,
    InfoLevel,
} from './LogMessages.styles';

const LogMessages = ({ test }) => {
    return test ? (
        <SelectedTestContainer>
            <FlexGrowColumn className="flex-grow flex-column">
                <table id="logMessages-table">
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
                                                <div
                                                    className="table-item"
                                                    title={log_level}
                                                >
                                                    {log_level}
                                                </div>
                                                <span>
                                                    <Fail />
                                                </span>
                                            </InfoLevel>
                                            <td>
                                                <SuiteLogMessage
                                                    message={message}
                                                />
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
                </table>
            </FlexGrowColumn>
        </SelectedTestContainer>
    ) : null;
};

export default LogMessages;
