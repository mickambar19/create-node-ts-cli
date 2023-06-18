#!/usr/bin/env node
import ora from 'ora'
import { fileURLToPath } from 'url'
import { cp } from 'node:fs/promises'
import path from 'node:path'
import { cwd } from 'node:process'

export const creator = async (packageName: string) => {
  const spinner = ora('Creating basic node typescript structure').start()
  const __dirname = fileURLToPath(import.meta.url)

  const templateFolder = path.join(
    __dirname,
    '../../templates/typescript-all-opt-in'
  )
  const newPackageFolder = path.join(cwd(), packageName)

  setTimeout(() => {
    spinner.color = 'yellow'
    spinner.text = 'Almost done'
  }, 2000)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

  await cp(templateFolder, newPackageFolder, { recursive: true })
  spinner.stop()
  console.log(
    '\x1b[32m All ready, you can start creating your CLI tool! \x1b[0m'
  )
}
