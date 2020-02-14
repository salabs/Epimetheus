// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Frontpage = () => {
  const frontpageStyles = css`
    max-width: 800px;
    width: 100%;
  `;

  return (
    <main id="frontpage" css={frontpageStyles}>
      <h1>Welcome</h1>

      <p>Welcome to Epimetheus. It is a frontend for your test results.</p>

      <h2>Roadmap</h2>

      <p>Items that are on short-term roadmap:</p>

      <ul>
        <li>Open source release: February 2020</li>
        <li>Support for multiple projects: March/April 2020</li>
        <li>Test-level view: March/April 2020</li>
      </ul>

      <h2>Terminology</h2>

      <p>
        We understand terminology can be daunting in tech world. Core terms used
        in this project are:
      </p>

      <ul>
        <li>
          Series/branch: Test runs that have close relation to each other. For
          example tests that are run in the same source control branch. Can be
          set in TestArchiver.
        </li>
        <li>
          Suite: Collection of individual cases. For example 4 tests that test
          login form with different cases. Specified in test files.
        </li>
        <li>
          Test: Individual test case. For example test that tries the login form
          with valid user. Specified in test files.
        </li>
        <li>
          Team: Specifies the project in multiple project setup. Can be set in
          TestArchiver. Default is &quot;No team&quot;.
        </li>
        <li>
          <a href="https://github.com/salabs/TestArchiver">TestArchiver</a>:
          Tool that saves test result data from xml files to database.
        </li>
        <li>
          <a href="https://github.com/salabs/ChangeEngine">ChangeEngine</a>:
          Tool that uses test result history stored in database to calculate
          which tests should run against certain code changes.
        </li>
      </ul>

      <h2>Icons</h2>

      <p>
        Icons to indicate test status use green/red/grey coloring combined with
        helping shapes. If you have trouble viewing the results, please create
        an accessibility issue in the repository. Our goal is to make this
        project accessible for everyone.
      </p>

      <img src="/img/testicons.png" alt="icon legend" />

      <h2>Different views</h2>

      <ul>
        <li>
          History: Shows how the recent test runs have executed. Amount of
          visible runs can be 5-30 (default 10).
        </li>
        <li>
          Last Build: Shows how tests are executed in selected test run. In case
          of failing tests, error messages are shown. Any metadata saved in
          TestArchiver execution is also shown.
        </li>
      </ul>

      <h2>How to give feedback?</h2>

      <p>
        Feedback can be given using GitHub issues or with{' '}
        <a href="https://www.siili.com/salabs">SALabs contact form</a>.
      </p>

      <h2>How to Contribute?</h2>

      <p>
        Collaboration is welcome, see contribution instructions in{' '}
        <a href="https://github.com/salabs/Epimetheus">GitHub</a>.
      </p>

      <h2>License</h2>

      <p>
        Epimetheus is licensed under{' '}
        <a href="https://choosealicense.com/licenses/apache-2.0/">
          Apache 2.0 license
        </a>
        .
      </p>
    </main>
  );
};

export default Frontpage;
