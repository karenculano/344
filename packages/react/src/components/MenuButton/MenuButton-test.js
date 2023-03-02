/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MenuItem } from '../Menu';

import { MenuButton } from './';

describe('MenuButton', () => {
  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    render(
      <MenuButton label="Actions" ref={ref}>
        <MenuItem label="Action" />
      </MenuButton>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByRole('button'));
  });

  it('should support a custom class name on the outermost element', () => {
    render(
      <MenuButton label="Actions" className="test">
        <MenuItem label="Action" />
      </MenuButton>
    );
    expect(screen.getByRole('button')).toHaveClass('test');
  });

  it('should forward additional props on the outermost element', () => {
    render(
      <MenuButton label="Actions" data-testid="test">
        <MenuItem label="Action" />
      </MenuButton>
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-testid', 'test');
  });

  it('should render props.label on the trigger button', () => {
    render(
      <MenuButton label="Test" data-testid="test">
        <MenuItem label="Action" />
      </MenuButton>
    );
    expect(screen.getByRole('button')).toHaveTextContent(/^Test$/);
  });

  it('opens a menu on click', async () => {
    render(
      <MenuButton label="Test" data-testid="test">
        <MenuItem label="Action" />
      </MenuButton>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('menu')).toBeTruthy();
    expect(screen.getByRole('menuitem')).toHaveTextContent(/^Action$/);
  });
});
