// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'src/generated/**', 'eslint.config.js', 'prisma.config.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    rules: {
      // --- No console in production code ---
      // Use a real logger (pino/winston) instead. Allow console.error/warn
      // only if you genuinely have no logger wired up yet — otherwise drop this override.
      'no-console': ['error'],

      // --- Type safety — production strictness ---
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],

      // --- General correctness / best practice ---
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      curly: ['error', 'all'],
      'no-else-return': 'error',
      'no-nested-ternary': 'error',
      'no-duplicate-imports': 'off', // superseded by import/no-duplicates below
      'no-return-await': 'off', // superseded by @typescript-eslint/return-await
      'require-await': 'off', // superseded by the TS-aware version below
      '@typescript-eslint/require-await': 'error',

      // --- Stylistic — replaces Prettier ---
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/max-len': ['warn', { code: 100, ignoreUrls: true }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/eol-last': ['error', 'always'],

      // --- Import hygiene ---
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'off', // Express route/controller files often default-export; flip to 'error' if your team prefers named exports only
    },
  },
  {
    // Relax return-type strictness for test files — tests are read far more
    // often than they're refactored, and forcing explicit return types on
    // every `it('...', () => {...})` adds noise without real safety benefit.
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);