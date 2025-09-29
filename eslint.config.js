import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    rules: {
            // Enforces 2-space indentation and treats violations as warnings
      "no-unused-vars": "off"      // Disables the rule preventing unused variables
    },
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
         'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
      'no-unused-vars': 'off', // turn off base rule
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

])