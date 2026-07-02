import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: [
      '.claude/**',
      '.cursor/**',
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Keep the security patch scoped; these stricter rules need a separate refactor pass.
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]

export default eslintConfig
