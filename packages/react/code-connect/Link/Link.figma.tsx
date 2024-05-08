/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from '@carbon/react';
import figma from '@figma/code-connect';

/**
 * -- This file was auto-generated by `figma connect create` --
 * `props` includes a mapping from Figma properties and variants to
 * suggested values. You should update this to match the props of your
 * code component, and update the `example` function to return the
 * code example you'd like to see in Figma
 */

figma.connect(
  Link,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=50111-991&mode=design&t=kyFCPK0tCeufcNP2-4',
  {
    props: {
      inline: figma.boolean('Inline'),
      linktext: figma.string('Link text'),
      swapicon: figma.instance('Swap icon'),
      icon: figma.boolean('Icon'),
      size: figma.enum('Size', {
        Large: 'large',
        Medium: 'medium',
        Small: 'small',
      }),
      state: figma.enum('State', {
        Enabled: 'enabled',
        Hover: 'hover',
        Focus: 'focus',
        Active: 'active',
        Visited: 'visited',
        Disabled: 'disabled',
      }),
    },
    example: () => <Link />,
  }
);
