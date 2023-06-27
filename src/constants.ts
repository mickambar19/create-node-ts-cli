type FILE_CONFIG = {
  variables?: string[]
  active: boolean
  targetFileName?: string
}

export const TEMPLATE_FILE_CONFIG: Record<string, FILE_CONFIG> = {
  '.eslintignore': {
    active: true,
  },
  '.eslintrc.json': {
    active: true,
  },
  '.gitignore-sample': {
    active: true,
    variables: [],
    targetFileName: '.gitignore',
  },
  '.npmignore-sample': {
    active: true,
    variables: [],
    targetFileName: '.npmignore',
  },
  '.nvmrc': {
    active: true,
    variables: [],
  },
  '.prettierrc.json': {
    active: true,
    variables: [],
  },
  'CONTRIBUTING.md': {
    active: true,
    variables: [],
  },
  LICENSE: {
    active: true,
    variables: ['AUTHOR_NAME'],
  },
  'README.md': {
    active: true,
    variables: ['PACKAGE_NAME'],
  },
  'package.json': {
    active: true,
    variables: ['PACKAGE_NAME', 'GIT_USER_NAME', 'AUTHOR_NAME'],
  },
  'tsconfig-sample.json': {
    active: true,
    variables: [],
    targetFileName: 'tsconfig.json',
  },
  'vite.config.ts': {
    active: true,
    variables: [],
  },
}
