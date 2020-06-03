// eslint-disable-next-line
import React from 'react';
import { useStateValue } from '../contexts/state';

const LastRunHeading = ({ id }) => {
    const [{ selectedBranchState }] = useStateValue();

    return (
        <h1>
            Project / {selectedBranchState.name} # {id}
        </h1>
    );
};

export default LastRunHeading;
