import { fileURLToPath } from 'url';

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */
const config = {
  parser: 'typescript',
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  endOfLine: 'auto',
  tailwindConfig: fileURLToPath(
    new URL('../../tooling/tailwind/web.ts', import.meta.url)
  ),
  tailwindFunctions: ['cn', 'cva'],
  overrides: [
    {
      files: '*.json.hbs',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.js.hbs',
      options: {
        parser: 'babel'
      }
    }
  ]
};

export default config;
