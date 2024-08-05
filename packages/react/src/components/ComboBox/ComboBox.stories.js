/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ComboBox from '../ComboBox';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './ComboBox.mdx';

const items = [
  {
    id: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const DownshiftPropsTest = () => {
  const downshiftActions = useRef();

  return (
    <div style={{ width: 300 }}>
      <ComboBox
        onChange={() => {}}
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText="ComboBox title"
        helperText="Combobox helper text"
        downshiftActions={downshiftActions}
        downshiftProps={{
          //         reset: () => void
          // openMenu: () => void
          // closeMenu: () => void
          // toggleMenu: () => void
          // selectItem: (item: Item | null) => void
          // setHighlightedIndex: (index: number) => void
          // setInputValue: (inputValue: string) => void

          // if (changes.selectedItem === null) {
          //   component?.setState({
          //     isOpen: true,
          //   });
          //   return;
          // }
          // if (changes?.isOpen && component?.inputValue === 'Item 1') {
          //   component?.setState({
          //     inputValue: '',
          //   });
          //   return;
          // }
          // if (changes?.isClosed && component?.inputValue !== 'Item 1') {
          //   component?.setState({
          //     inputValue: 'Item 1',
          //   });
          //   return;
          // }

          //   {
          //     "type": "__input_blur__",
          //     "highlightedIndex": -1,
          //     "isOpen": false,
          //     "selectedItem": null,
          //     "inputValue": ""
          // }
          onSelectedItemChange: (changes) => {
            // console.log('onSelectedItemChange', changes);
            // keep the menu open after selection
            // downshiftActions.current.openMenu();
          },
          onIsOpenChange: (changes) => {
            console.log('onIsOpenChange', changes);
            console.log('downshiftActions', downshiftActions);

            const { isOpen, selectedItem, inputValue } = changes;

            if (!selectedItem) {
              downshiftActions.current.openMenu();
            }

            if (isOpen && inputValue === 'Option 1') {
              downshiftActions.current.setInputValue('');
            }

            if (!isOpen && inputValue !== 'Option 1') {
              downshiftActions.current.setInputValue('Option 1');
            }
          },
          onHighlightedIndexChange: (changes) => {
            // console.log('onHighlightedIndexChange', changes);
          },
          onInputChange: (changes) => {
            // console.log('onInputChange', changes);
          },
          onStateChange: (changes) => {
            // console.log('onStateChange', changes);
          },
        }}
      />
    </div>
  );
};

export const Default = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
  </div>
);

export const AllowCustomValue = (args) => {
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        allowCustomValue
        shouldFilterItem={filterItems}
        onChange={args.onChange}
        id="carbon-combobox"
        items={['Apple', 'Orange', 'Banana', 'Pineapple', 'Raspberry', 'Lime']}
        titleText="ComboBox title"
        helperText="Combobox helper text"
      />
    </div>
  );
};
export const ExperimentalAutoAlign = () => (
  <div style={{ width: 400 }}>
    <div style={{ height: 300 }}></div>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
      autoAlign={true}
    />
    <div style={{ height: 800 }}></div>
  </div>
);

AllowCustomValue.argTypes = {
  onChange: { action: 'onChange' },
};

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <ComboBox
          onChange={() => {}}
          id={`carbon-combobox-${layer}`}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          titleText="ComboBox title"
          helperText="Combobox helper text"
        />
      </div>
    )}
  </WithLayer>
);

const aiLabel = (
  <AILabel className="slug-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
      slug={aiLabel}
    />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: 300 }}>
    <ComboBox
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
      {...args}
    />
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
  className: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  downshiftProps: {
    table: {
      disable: true,
    },
  },
  initialSelectedItem: {
    table: {
      disable: true,
    },
  },
  invalidText: {
    control: 'text',
  },
  items: {
    table: {
      disable: true,
    },
  },
  itemToElement: {
    table: {
      disable: true,
    },
  },
  itemToString: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'changed',
  },
  onToggleClick: {
    action: 'clicked',
  },
  onInputChange: {
    table: {
      disable: true,
    },
  },
  selectedItem: {
    table: {
      disable: true,
    },
  },
  shouldFilterItem: {
    table: {
      disable: true,
    },
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  titleText: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  warnText: {
    control: 'text',
  },
};
