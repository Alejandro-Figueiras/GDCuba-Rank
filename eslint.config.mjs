import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import next from "eslint-config-next";
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, ...next, ...compat.config({
  extends: ["plugin:react/recommended", 'plugin:@typescript-eslint/recommended']
}), {
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@next/next/no-img-element': 'off',
    'react-hooks/set-state-in-effect': 'off',
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}];

export default eslintConfig;