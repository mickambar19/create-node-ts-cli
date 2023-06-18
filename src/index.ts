#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { Command, Option, Argument } from 'commander'
import { creator } from './creator.js'

const createProgram = async (): Promise<Command> => {
  const filePath = new URL('../package.json', import.meta.url)

  const packageJSON: { version: string } = JSON.parse(
    (await readFile(filePath)).toString()
  )

  const program = new Command()
  program
    .name('node-ts-cli')
    .description(
      'CLI to generate basic folder structure for new node ts cli tool'
    )
    .version(`${JSON.stringify(packageJSON.version)}`)

  program
    .command('creator', { isDefault: true })
    .addArgument(new Argument('<packageName>', 'package name'))
    .addOption(new Option('-w, --wizard', 'select opt-ins'))
    .action(creator)

  program.parse()
  return program
}

await createProgram()
