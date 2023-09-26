/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const templates = require('./templates');
const ts = require('typescript');

/**
 * TypeScript compiler options to use when producing definition files
 * @type ts.CompilerOptions
 */
const tsConfig = {
  target: ts.ScriptTarget.ES2015,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
  esModuleInterop: true,
  strict: true,
  skipLibCheck: true,
};

function emitIconComponent(compileOpts) {
  const options = { ...tsConfig, ...compileOpts };
  const host = ts.createCompilerHost(options);
  const iconComponentPath = path.resolve(__dirname, '../components/Icon.tsx');
  const program = ts.createProgram([iconComponentPath], options, host);
  const emitResult = program.emit();
  ts.getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)
    .forEach((diagnostic) => {
      console.log(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      );
    });
}

async function copyCarbonIconType(outDir) {
  const srcPath = path.resolve(__dirname, '../components/CarbonIcon.d.ts');
  const destPath = path.resolve(outDir, 'CarbonIcon.d.ts');
  await fs.copyFile(srcPath, destPath);
}

async function writeModuleTypes(modules, outDir) {
  for (const m of modules) {
    const content =
      templates.banner +
      '\n' +
      "import type { CarbonIconType } from './CarbonIcon';\n" +
      'export const ' +
      m.name +
      ': CarbonIconType;\n';
    const filename = path.resolve(outDir, m.filepath.replace(/\.js$/, '.d.ts'));
    await fs.writeFile(filename, content);
  }
}

async function writeBucketTypes(buckets, outDir) {
  for (const bucket of buckets) {
    const iconLines = [];
    for (const m of bucket.modules) {
      iconLines.push('export const ' + m.name + ': CarbonIconType;');
    }
    const bucketModule = `generated/${bucket.id}`;
    const filepath = path.resolve(outDir, `${bucketModule}.d.ts`);
    const content =
      templates.banner +
      '\n' +
      "import type { CarbonIconType } from '../CarbonIcon';\n" +
      iconLines.join('\n') +
      '\n';
    await fs.writeFile(filepath, content);
  }
}

async function writeIndex(buckets, outDir) {
  const bucketModules = buckets.map((bucket) => `generated/${bucket.id}`);
  const indexContent =
    templates.banner +
    '\n' +
    "export { default as Icon } from './Icon';\n" +
    bucketModules.map((path) => "export * from './" + path + "';").join('\n') +
    '\n';
  await fs.writeFile(path.resolve(outDir, 'index.d.ts'), indexContent);
}

async function writeTsDefinitions(modules, buckets, moduleKind, outDir) {
  emitIconComponent({ module: moduleKind, outDir });
  copyCarbonIconType(outDir);
  writeModuleTypes(modules, outDir);
  writeBucketTypes(buckets, outDir);
  writeIndex(buckets, outDir);
}

module.exports = {
  writeTsDefinitions,
};
