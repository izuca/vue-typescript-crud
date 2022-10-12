/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-typescript/recommended",
		"standard",
		"plugin:prettier/recommended",
	],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"vue/multi-word-component-names": "off",
	},
}
