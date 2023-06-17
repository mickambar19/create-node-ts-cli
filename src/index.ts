#!/usr/bin/env node

import { argv } from 'process'

console.log('CLI is working as expected')
console.log('Argument values passed', { argv })

const sum = (a: number, b: number) => {
  return a + b
}

sum(1, 2)
