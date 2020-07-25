#!/usr/bin/env node

import program from 'commander';
// Currently importing JSON modules are only supported in the commonjs mode
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');

program
  .description(description)
  .version(version)
  .helpOption('-h, --help', 'output usage information');

program.parse();
