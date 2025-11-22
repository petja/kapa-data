import tseslint from "typescript-eslint";

export default tseslint.config(...tseslint.configs.recommended, {
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrors: "none",
			},
		],
	},
});
