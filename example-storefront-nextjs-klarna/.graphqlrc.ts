import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(".");

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.NEXT_PUBLIC_SALEOR_API_URL,
	documents: "graphql/**/*.graphql",
	generates: {
		"generated/": {
			preset: "client",
			config: {
				useTypeImports: true,
				skipTypename: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				documentMode: "string",
			},
			presetConfig: {
				fragmentMasking: false,
			},
		},
	},
};

export default config;
