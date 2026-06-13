import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];

export default eslintConfig;
