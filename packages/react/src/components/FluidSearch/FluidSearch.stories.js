/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSearch, FluidSearchSkeleton } from '.';
// import {
//   ToggletipLabel,
//   Toggletip,
//   ToggletipButton,
//   ToggletipContent,
// } from '../Toggletip';
// import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidSearch',
  component: FluidSearch,
  subcomponents: {
    FluidSearchSkeleton,
  },
};

// const ToggleTip = (
//   <>
//     <ToggletipLabel>Label</ToggletipLabel>
//     <Toggletip align="top-left">
//       <ToggletipButton label="Show information">
//         <Information />
//       </ToggletipButton>
//       <ToggletipContent>
//         <p>Additional field information here.</p>
//       </ToggletipContent>
//     </Toggletip>
//   </>
// );

export const Default = () => (
  <div style={{ width: '400px' }}>
    <FluidSearch
      size="lg"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="fluid-search-1"
      placeholder="Prompt text"
    />
  </div>
);

export const Skeleton = () => (
  <div style={{ width: '400px' }}>
    <FluidSearchSkeleton />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidSearch {...args} />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 400,
  },
  // defaultValue: {
  //   control: {
  //     type: 'number',
  //   },
  //   defaultValue: 50,
  // },
  // invalid: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // invalidText: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue:
  //     'Error message that is really long can wrap to more lines but should not be excessively long.',
  // },
  // disabled: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // label: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue: 'Label',
  // },
  // warn: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // warnText: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue:
  //     'Warning message that is really long can wrap to more lines but should not be excessively long.',
  // },
};
