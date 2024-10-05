// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// @ts-expect-error no types for library exist
import jest from "eslint-plugin-jest";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.stylisticTypeChecked,
  includeIgnoreFile(path.resolve(__dirname, ".gitignore")),
  {
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jest: jest,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
