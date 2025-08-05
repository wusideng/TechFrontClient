import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"], rules: {} },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // 这里的规则会覆盖之前的配置
      "no-undef": "error",
      "no-unused-vars": "warn",
      "react/jsx-no-undef": "error",
      "react/react-in-jsx-scope": "warn",
      "react/prop-types": "off",
      "react/no-deprecated": "warn",
      "eol-last": "off",
    },
  },
  // 为配置文件添加 Node.js 环境
  {
    files: ["webpack.config.js", "*.config.js", "*.config.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
