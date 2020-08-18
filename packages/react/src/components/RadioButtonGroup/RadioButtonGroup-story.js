/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import FormGroup from '../FormGroup';
import mdx from './RadioButtonGroup.mdx';

const values = {
  standard: 'standard',
  'default-selected': 'default-selected',
  disabled: 'disabled',
};

const orientations = {
  'Horizontal (horizontal)': 'horizontal',
  'Vertical (vertical)': 'vertical',
};

const labelPositions = {
  'Left (left)': 'left',
  'Right (right)': 'right',
};

const props = {
  group: () => ({
    name: text(
      'The form control name (name in <RadioButtonGroup>)',
      'radio-button-group'
    ),
    valueSelected: select(
      'Value of the selected button (valueSelected in <RadioButtonGroup>)',
      values,
      'default-selected'
    ),
    orientation: select(
      'Radio button orientation (orientation)',
      orientations,
      'horizontal'
    ),
    labelPosition: select(
      'Label position (labelPosition)',
      labelPositions,
      'right'
    ),
    onChange: action('onChange'),
  }),
  radio: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled in <RadioButton>)', false),
    labelText: text(
      'Label text (labelText in <RadioButton>)',
      'Radio button label'
    ),
  }),
};

export default {
  title: 'RadioButtonGroup',
  decorators: [withKnobs],

  parameters: {
    component: RadioButtonGroup,
    docs: {
      page: mdx,
    },

    subcomponents: {
      RadioButton,
    },
  },
};

export const Default = () => {
  const radioProps = props.radio();
  return (
    <FormGroup legendText="Radio Button heading">
      <RadioButtonGroup
        defaultSelected="default-selected"
        legend="Group Legend"
        {...props.group()}>
        <RadioButton value="standard" id="radio-1" {...radioProps} />
        <RadioButton value="default-selected" id="radio-2" {...radioProps} />
        <RadioButton value="disabled" id="radio-3" {...radioProps} />
      </RadioButtonGroup>
    </FormGroup>
  );
};
