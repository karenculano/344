/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @typedef Runner
 * @property {Function} beforeEach
 * @property {Function} afterEach
 * @property {Function} run
 */

/**
 * Create a runner for the given collection of rules
 * @param {Array<Rule>} rules
 * @returns Runner
 */
export function createRunner(rules, options = {}) {
  const { globals, only = [], exclude = [] } = options;
  const levels = {
    error: 'violation',
    warning: 'warning',
  };
  const rulesToRun = rules.filter(rule => {
    if (only.length > 0) {
      return only.includes(rule.id);
    } else if (exclude.length > 0) {
      return !exclude.includes(rule.id);
    }
    // By default, run all rules
    return true;
  });

  let _beforeAll;
  let _beforeEach;
  let _afterEach;

  return {
    beforeAll(fn) {
      _beforeAll = fn;
    },
    beforeEach(fn) {
      _beforeEach = fn;
    },
    afterEach(fn) {
      _afterEach = fn;
    },
    test() {
      const { describe, beforeAll, beforeEach, afterEach, test } = globals;

      rulesToRun.forEach(rule => {
        describe(rule.id, () => {
          let node;

          beforeAll(() => {
            _beforeAll();
          });

          beforeEach(() => {
            node = _beforeEach(rule.context);
          });

          afterEach(() => {
            _afterEach(node);
          });

          test(rule.description, async () => {
            const error = await rule.validate(node, rule.context);
            if (error) {
              throw error;
            }
          });
        });
      });
    },

    async run() {
      const report = {
        violations: [],
        warnings: [],
      };

      // Run checks in as many threads as the host environment allows
      await Promise.all(
        rulesToRun.map(rule => {
          const node = _beforeEach(rule.context);
          const result = rule.validate(node, rule.context);

          if (result) {
            const severity = levels[rule.level];
            if (Array.isArray(result)) {
              report[severity].push(...result);
            } else {
              report[severity].push(result);
            }
          }

          _afterEach(node);
        })
      );

      return report;
    },
  };
}
