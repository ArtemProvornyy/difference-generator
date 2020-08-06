#!/usr/bin/env node

import program from 'commander';
// Currently importing JSON modules are only supported in the commonjs mode
import { createRequire } from 'module';
import getJSONDiff from '../index.js';

const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');

program
  .description(description)
  .version(version)
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(getJSONDiff(filepath1, filepath2)));

program.parse();
