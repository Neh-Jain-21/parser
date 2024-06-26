import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve("src/"),
		},
	},
	esbuild: {
		jsxInject: `import React from 'react'`,
	},
	server: { host: true },
});
