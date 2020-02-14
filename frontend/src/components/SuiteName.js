import React, { Fragment } from 'react';
import { dashify } from '../helpers';

// Show suite name separated on different lines with dots showing depth level
const SuiteName = ({ tableCellHeight, suiteName }) => {
  let tempSuiteName = suiteName.split('.');
  let splitSuiteName = [];
  for (var index = 0; index < tempSuiteName.length; index++) {
    let el = tempSuiteName[index];
    splitSuiteName.push(
      <Fragment key={index}>
        .{el}
        <br />
      </Fragment>
    );
  }
  return (
    <td rowSpan={tableCellHeight} data-ta={`suite-${dashify(suiteName)}`}>
      {splitSuiteName}
    </td>
  );
};

export default SuiteName;
