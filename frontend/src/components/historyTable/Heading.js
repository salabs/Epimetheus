import { useStateValue } from '../../contexts/state';
import { Link } from 'react-router-dom';
/** @jsx jsx */

import { css, jsx } from '@emotion/core';

// helper for build number sorting
function compareNumbers(a, b) {
  return a - b;
}

const Heading = () => {
  const headingStyles = css`
    background: blue;
    .run-link-wrapper {
      padding: 0;
    }
    .run-link {
      display: block;
      width: 100%;
      margin: 0;
      padding: 10px;
      height: 100%;
      transition: 0.33s background-color;
      &:hover,
      &:active {
        background-color: #ccc;
        transition: 0.1s background-color;
      }
    }
  `;
  const [
    {
      historyDataState: { max_build_num },
      amountOfBuilds,
      selectedBranchState,
    },
    dispatch
  ] = useStateValue();
  let { id } = selectedBranchState;
  let headingBuildNumbers = [];
  const LIMIT =
    max_build_num - amountOfBuilds > 0 ? max_build_num - amountOfBuilds : 0;

  for (let i = max_build_num; i > LIMIT; i--) {
    headingBuildNumbers.push(i);
  }

  const handleBuildClick = e => {
    const selectedBuild = e.target.innerText.slice(6);
    dispatch({
      type: 'setSelectedBuild',
      selectedBuild
    });
  };

  // Use numeric sort to ensure correct build number ordering
  const buildNumbers = headingBuildNumbers
    .sort(compareNumbers)
    .reverse()
    .map(buildNumber => (
      <th
        className="run-link-wrapper centerTableCellContent"
        key={buildNumber}
        onClick={e => handleBuildClick(e)}
      >
        <Link className="run-link" to={`/build/series/${buildNumber}/${id}`}>
          <span className="sr-show">Build </span>
          {buildNumber}
        </Link>
      </th>
    ));
  return (
    <thead id="history-table-head" css={headingStyles}>
      <tr>
        <th>Suite</th>
        <th>Test</th>
        {buildNumbers}
      </tr>
    </thead>
  );
};

export default Heading;
