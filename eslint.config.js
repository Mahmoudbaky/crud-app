import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import tseslint from 'typescript-eslint'
>>>>>>> 4447c78e88b72d7e6dc902e662ecb48725ae5246
>>>>>>> 7e7ca8ce27f123636ac5c6a1fcfb00c981888a08
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
<<<<<<< HEAD
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
=======
<<<<<<< HEAD
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
=======
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
>>>>>>> 4447c78e88b72d7e6dc902e662ecb48725ae5246
>>>>>>> 7e7ca8ce27f123636ac5c6a1fcfb00c981888a08
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7e7ca8ce27f123636ac5c6a1fcfb00c981888a08
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
<<<<<<< HEAD
=======
=======
>>>>>>> 4447c78e88b72d7e6dc902e662ecb48725ae5246
>>>>>>> 7e7ca8ce27f123636ac5c6a1fcfb00c981888a08
    },
  },
])
