/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { Tab as TabNext } from './next/Tab';
import { Tab as TabClassic } from './Tab';

export const Tab = FeatureFlags.enabled('enable-v11-release')
  ? TabNext
  : TabClassic;
