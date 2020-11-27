/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ContextMenu, { ContextMenuOption } from '../ContextMenu';

export default {
  title: 'ContextMenu',
  parameters: {
    component: ContextMenu,
  },
};

export const _ContextMenu = () => (
  <ContextMenu>
    <ContextMenuOption label="Share with" />
    <ContextMenuOption label="Cut" />
    <ContextMenuOption label="Copy" />
    <ContextMenuOption label="Copy path" />
    <ContextMenuOption label="Paste" />
    <ContextMenuOption label="Duplicate" />
    <ContextMenuOption label="Rename" />
    <ContextMenuOption label="Delete" />
  </ContextMenu>
);

_ContextMenu.storyName = 'ContextMenu';
