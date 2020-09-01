import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';

const useMetadata = () => {
    const [{ selectedBranchState, branchesState }, dispatch] = useStateValue();
    let { buildId, seriesId } = useParams();

    const branch_id = seriesId || selectedBranchState;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (branch_id && buildId) {
                try {
                    const res = await fetch(
                        `/data/series/${branch_id}/builds/${buildId}/metadata`,
                        {}
                    );
                    const json = await res.json();
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'setMetadata',
                        metadata: json,
                    });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            }
        };

        if (branchesState) {
            fetchData();
        }

        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'flushMetadata' });
        };
    }, [branch_id, branchesState, buildId, dispatch]);
};

export default useMetadata;
