#!/usr/bin/env node
const dictionary = require('./src/lib/dictionary');

const args = process.argv.slice(2);

dictionary(args[0])
  .then(console.log)
  .catch(console.error);
