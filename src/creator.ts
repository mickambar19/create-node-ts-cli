#!/usr/bin/env node
import ora from 'ora'
import { fileURLToPath } from 'url'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cwd } from 'node:process'
import { TEMPLATE_FILE_CONFIG } from './constants.js'
import { copyFile, cp, mkdir, writeFile } from 'fs/promises'

const isValidPackageName = (packageName: string): boolean => {
  return /^([a-z]+[-_]{1}?)*[a-z]+$/.test(packageName)
}

export const creator = async (
  packageName: string,
  authorName: string,
  gitUserName: string
) => {
  if (!isValidPackageName(packageName)) {
    console.log(
      `
\x1b[91m Use a valid name for your package. Visit: \x1b[0m
\x1b[34m https://docs.npmjs.com/creating-a-package-json-file#required-name-and-version-fields\x1b[0m
      `
    )

    return
  }
  if (authorName.length < 2) {
    console.log(
      '\x1b[31m Make sure you provide an author name with a correct name.\x1b[0m'
    )
    return
  }

  const spinner = ora('Creating basic node typescript structure').start()
  setTimeout(() => {
    spinner.color = 'yellow'
    spinner.text = 'Almost done'
  }, 400)
  const __dirname = fileURLToPath(import.meta.url)
  const baseFilesFolder = path.join(__dirname, '../../templates/base-files')
  const newPackageFolder = path.join(cwd(), packageName)
  try {
    await mkdir(newPackageFolder)
  } catch (error) {
    console.log(`
\x1b[31m An existing folder exists with the same name. \x1b[0m
    `)
    spinner.stop()
    return
  }

  const replacers: Record<string, string | undefined> = {
    AUTHOR_NAME: authorName,
    PACKAGE_NAME: packageName,
    GIT_USER_NAME: gitUserName,
  }

  Object.entries(TEMPLATE_FILE_CONFIG).map(async ([fileName, config]) => {
    const { variables, active, targetFileName } = config
    const newFilePath = path.join(newPackageFolder, targetFileName || fileName)
    const templateFilePath = path.join(baseFilesFolder, fileName)
    if (active && (!variables || (variables && !variables.length))) {
      await copyFile(templateFilePath, newFilePath)
    }
    if (active && variables && variables.length) {
      let fileContent = await readFile(templateFilePath, { encoding: 'utf8' })
      const variablesRegExp = new RegExp(`(${variables.join('|')})`, 'g')
      fileContent = fileContent.replace(
        variablesRegExp,
        (match) => `${replacers[match] || match}`
      )
      await writeFile(newFilePath, fileContent)
    }
  })
  const sampleCodeFolder = path.join(__dirname, '../../templates/sample-test')
  await cp(sampleCodeFolder, newPackageFolder, {
    recursive: true,
    force: true,
    errorOnExist: false,
  })

  await await new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

  spinner.stop()
  console.log(
    `
\x1b[32m All ready, you can start creating your CLI tool! \x1b[0m
  
\x1b[32m $ cd ${packageName} && yarn install\x1b[0m

\x1b[32m $ yarn run dev\x1b[0m
  `
  )
}
