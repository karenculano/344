/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const { colors, hoverColors } = require('@carbon/colors');
const { types: t, generate } = require('@carbon/scss-generator');
const { paramCase } = require('change-case');
const fs = require('fs-extra');
const path = require('path');

const FILE_BANNER = t.Comment(` Code generated by @carbon/colors. DO NOT EDIT.

 Copyright IBM Corp. 2018, 2021

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
`);

async function build() {
  // Colors has the shape:
  // type Colors = {
  //   [swatch: string]: {
  //     [grade: string]: string,
  //   }
  // };
  //
  // We want to convert this into a flat array of variable descriptors that we
  // can use to create mixins. This flat array will look like:
  // type ColorValues = Array<{ swatch: string, grade: string, value: string }>
  const colorValues = Object.keys(colors).reduce((acc, key) => {
    const swatch = paramCase(key);
    const values = Object.keys(colors[key]).reduce((acc, grade) => {
      const value = colors[key][grade];
      return acc.concat({
        swatch,
        grade,
        value,
      });
    }, []);

    return acc.concat(...values);
  }, []);

  // Build up our collection of hover color values. This structure is a little
  // different than our other color format because of how we format the name to
  // include the grade in between the swatch name and the hover keyword
  const hoverColorValues = Object.keys(hoverColors).reduce((acc, key) => {
    const swatch = paramCase(key.replace(/Hover/, ''));

    if (typeof hoverColors[key] !== 'object') {
      return acc.concat({
        name: `${swatch}-hover`,
        value: hoverColors[key],
      });
    }

    const values = Object.keys(hoverColors[key]).reduce((acc, grade) => {
      const value = hoverColors[key][grade];
      return acc.concat({
        name: `${swatch}-${grade}-hover`,
        value,
      });
    }, []);

    return acc.concat(...values);
  }, []);

  const sassModule = t.StyleSheet([
    FILE_BANNER,
    t.Newline(),

    t.Assignment({
      id: t.Identifier('black'),
      init: t.SassColor('#000000'),
      default: true,
    }),
    t.Assignment({
      id: t.Identifier('white'),
      init: t.SassColor('#ffffff'),
      default: true,
    }),
    t.Newline(),

    ...colorValues.map(({ grade, swatch, value }) => {
      return t.Assignment({
        id: t.Identifier(`${swatch}-${grade}`),
        init: t.SassColor(value),
        default: true,
      });
    }),

    t.Newline(),

    ...hoverColorValues.map(({ name, value }) => {
      return t.Assignment({
        id: t.Identifier(name),
        init: t.SassColor(value),
        default: true,
      });
    }),

    t.Newline(),

    t.Comment(`/ Colors from the IBM Design Language
/ @access public
/ @group @carbon/colors`),
    t.Assignment({
      id: t.Identifier('colors'),
      init: t.SassMap({
        properties: Object.keys(colors).map((key) => {
          const swatch = paramCase(key);
          return t.SassMapProperty({
            quoted: true,
            key: t.Identifier(swatch),
            value: t.SassMap({
              properties: Object.keys(colors[key]).map((grade) => {
                return t.SassMapProperty({
                  key: t.Identifier(grade),
                  value: t.SassColor(colors[key][grade]),
                });
              }),
            }),
          });
        }),
      }),
      default: true,
    }),
  ]);

  const MODULES_ENTRYPOINT = path.resolve(__dirname, '..', 'index.scss');

  await Promise.all([
    fs.writeFile(MODULES_ENTRYPOINT, generate(sassModule).code),
  ]);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
