/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as CodeSnippet, CodeSnippetSkeleton } from '.';
import mdx from './CodeSnippet.mdx';

export default {
  title: 'Components/CodeSnippet',
  component: CodeSnippet,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22CodeSnippetFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22code-snippet%22%2C%22variant%22%3A%22single%22%2C%22code%22%3A%22%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22code-snippet-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};


export const Inline = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <CodeSnippet type="inline" feedback="Copied to clipboard">
      {'node -v'}
    </CodeSnippet>
  </div>
);

export const Multiline = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <CodeSnippet type="multi" feedback="Copied to clipboard">
      {`  "scripts": {
      "build": "lerna run build --stream --prefix --npm-client yarn",
      "ci-check": "carbon-cli ci-check",
      "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
      "doctoc": "doctoc --title '## Table of Contents'",
      "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
      "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
      "lint": "eslint actions config codemods packages",
      "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
      "sync": "carbon-cli sync",
      "test": "cross-env BABEL_ENV=test jest",
      "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
    },
    "resolutions": {
      "react": "~16.9.0",
      "react-dom": "~16.9.0",
      "react-is": "~16.9.0",
      "react-test-renderer": "~16.9.0"
    },
    "devDependencies": {
      "@babel/core": "^7.10.0",
      "@babel/plugin-proposal-class-properties": "^7.7.4",
      "@babel/plugin-proposal-export-default-from": "^7.7.4",
      "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
      "@babel/plugin-transform-runtime": "^7.10.0",
      "@babel/preset-env": "^7.10.0",
      "@babel/preset-react": "^7.10.0",
      "@babel/runtime": "^7.10.0",
      "@commitlint/cli": "^8.3.5",`}
    </CodeSnippet>
  </div>
);

export const Singleline = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <CodeSnippet type="single" feedback="Copied to clipboard">
      yarn add carbon-components@latest carbon-components-react@latest
      @carbon/icons-react@latest carbon-icons@latest
    </CodeSnippet>
  </div>
);

export const InlineWithLayer = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <WithLayer>
      <CodeSnippet type="inline" feedback="Copied to clipboard">
        {'node -v'}
      </CodeSnippet>
    </WithLayer>
  </div>
);

export const MultilineWithLayer = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <WithLayer>
      <CodeSnippet type="multi" feedback="Copied to clipboard">
        {`  "scripts": {
        "build": "lerna run build --stream --prefix --npm-client yarn",
        "ci-check": "carbon-cli ci-check",
        "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
        "doctoc": "doctoc --title '## Table of Contents'",
        "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
        "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
        "lint": "eslint actions config codemods packages",
        "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
        "sync": "carbon-cli sync",
        "test": "cross-env BABEL_ENV=test jest",
        "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
        },
        "resolutions": {
          "react": "~16.9.0",
          "react-dom": "~16.9.0",
          "react-is": "~16.9.0",
          "react-test-renderer": "~16.9.0"
        },
        "devDependencies": {
          "@babel/core": "^7.10.0",
          "@babel/plugin-proposal-class-properties": "^7.7.4",
          "@babel/plugin-proposal-export-default-from": "^7.7.4",
          "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
          "@babel/plugin-transform-runtime": "^7.10.0",
          "@babel/preset-env": "^7.10.0",
          "@babel/preset-react": "^7.10.0",
          "@babel/runtime": "^7.10.0",
          "@commitlint/cli": "^8.3.5",`}
      </CodeSnippet>
    </WithLayer>
  </div>
);

export const SinglelineWithLayer = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <WithLayer>
      <CodeSnippet type="single" feedback="Copied to clipboard">
        yarn add carbon-components@latest carbon-components-react@latest
        @carbon/icons-react@latest carbon-icons@latest
      </CodeSnippet>
    </WithLayer>
  </div>
);

export const Skeleton = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <CodeSnippetSkeleton type="single" style={{ marginBottom: 8 }} />
    <CodeSnippetSkeleton type="multi" />
  </div>
);

export const Playground = (args) => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <CodeSnippet type="single" feedback="Copied to clipboard" {...args}>
      {'yarn add @carbon/react'}
    </CodeSnippet>
  </div>
);

Playground.argTypes = {
  ['aria-label']: {
    table: {
      disable: true,
    },
  },
  ariaLabel: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
};
