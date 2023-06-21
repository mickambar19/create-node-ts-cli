#!/usr/bin/env node
import { input } from '@inquirer/prompts'
import { Argument, Command } from 'commander'

export const sum = (a: number, b: number) => {
  return a + b
}

const main = () => {
  const program = new Command()
  program
    .command('operations', { isDefault: true })
    .addArgument(
      new Argument(
        '<operationName>',
        'Indicates the operation that should be executed'
      )
    )
    .action(async (operationName) => {
      const operations: Record<string, (a: number, b: number) => number> = {
        sum,
      }
      const a = +(await input({ message: 'Argument A:' })) || 0
      const b = +(await input({ message: 'Argument B:' })) || 0
      console.log(`OperationName ${operationName}, using a: ${a}, b:${b}`)
      console.log(`${
        operations[operationName]
          ? `Result: ${operations[operationName](a, b)}`
          : 'Operation not implemented yet'
      }
      `)
    })
  program.parse()
}

main()
