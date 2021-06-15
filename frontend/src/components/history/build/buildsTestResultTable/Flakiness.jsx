import React from 'react';
import PropTypes from 'prop-types';
import { buildPropType } from '../../../../utils/PropTypes';
import { pickIcon } from '../../../../utils/TestIcon';
import { StyledRow } from './Flakiness.styles';

const Flakiness = ({ builds, id }) => {
    const indexOfBuild = builds.findIndex(b => {
        return b.build_number === Number(id);
    });

    const begin = indexOfBuild === -1 ? 0 : indexOfBuild;
    const end = indexOfBuild + 5;
    const slicedBuilds = builds.slice(begin, end);

    const flakinessTemplate = [{}, {}, {}, {}, {}].map((x, i) => {
        return (x[i] = {
            buildNumber: Number(id) - i,
            test_status: 'EMPTY',
        });
    });

    const findIndex = (arr, itemToFind) =>
        arr.findIndex(x => x.build_number === itemToFind.buildNumber);

    const flakinessData =
        slicedBuilds.length < 5
            ? flakinessTemplate
                  .map(templateItem => templateItem)
                  .reduce((temp, templateItem) => {
                      const indexOfBuilds = findIndex(
                          slicedBuilds,
                          templateItem
                      );
                      const buildNumbers = slicedBuilds.map(
                          b => b.build_number
                      );

                      !buildNumbers.includes(templateItem.buildNumber)
                          ? temp.push(templateItem)
                          : temp.push(slicedBuilds[indexOfBuilds]);
                      return temp;
                  }, [])
            : slicedBuilds;
    const flakinessIcons = flakinessData.map(({ test_status }, i) => {
        return <span key={i}>{pickIcon(test_status)}</span>;
    });
    return <StyledRow className="flakiness-row">{flakinessIcons}</StyledRow>;
};

Flakiness.propTypes = {
    builds: PropTypes.arrayOf(buildPropType).isRequired,
    id: PropTypes.string.isRequired,
};

export default Flakiness;
