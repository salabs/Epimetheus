// eslint-disable-next-line
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ThemeContext from '../contexts/themeContext';
import { useStateValue } from '../contexts/state';

const MainNav = () => {
  const theme = useContext(ThemeContext);
  const mainNavStyles = css`
    flex: 0 0 280px;
    @media only screen and (max-width: 999px) {
      flex: 0 0 120px;
    }
    h2 {
      padding: 20px 20px 0px 20px;
      @media only screen and (max-width: 999px) {
        display: block;
        width: 0;
        height: 40px;
        padding: 0;
        margin: 0;
        overflow: hidden;
        &:after {
          display: block;
          width: 100px;
          top: 15px;
          left: 10px;
          content: 'Epi';
          position: absolute;
        }
      }
    }
    ul {
      list-style-type: none;
      padding: 0;
      li {
        padding: & + li {
          padding-top: ${theme.spacing.xs / 2}px;
        }

        a {
          display: block;
          width: 100%;
          padding: 15px 20px;
          @media only screen and (max-width: 999px) {
            padding: 15px 20px 15px 10px;
          }
          transition: 0.33s background-color;
          &:hover,
          &:active {
            background-color: #ccc;
            transition: 0.1s background-color;
          }
        }
        &.nav-github {
          font-size: 1.2em;
          margin-top: 1em;
          font-weight: bold;
        }
      }
      a.active {
        font-weight: bold;
        background-color: #ccc;
      }
    }
  `;
  const [{ historyDataState }, dispatch] = useStateValue();
  const maxBuildNum = historyDataState ? historyDataState.max_build_num : null;

  const handleClick = () => {
    if (maxBuildNum) {
      dispatch({
        type: 'setSelectedBuild',
        selectedBuild: maxBuildNum
      });
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && maxBuildNum) {
      dispatch({
        type: 'setSelectedBuild',
        selectedBuild: maxBuildNum
      });
    }
  };

  return (
    <nav id="main-nav" css={mainNavStyles}>
      <h2 className="logo">Epimetheus</h2>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Help
          </NavLink>
        </li>{' '}
        <li>
          <NavLink activeClassName="active" to="/history/">
            History
          </NavLink>
        </li>
        {/* 
        Commented out at the moment, can be implemented in the future to show some exact place wanted,
        currently worked as a hard coded series, ideas on what to show here and should an implementation like this
        be used are welcome. 
        <li>
          <NavLink
            activeClassName="active"
            to={`/build/series/${maxBuildNum}/3`}
            onClick={() => handleClick()}
            onKeyDown={e => handleKeyDown(e)}
          >
            Last Build
          </NavLink>
        </li>
        */}
        <li className="nav-github">
          <a href="https://github.com/salabs/Epimetheus">GitHub</a>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
