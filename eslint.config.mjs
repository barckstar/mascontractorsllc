import coreWebVitals from "eslint-config-next/core-web-vitals";

// ESLint 10 (flat config). Reemplaza al viejo .eslintrc.json porque Next 16
// eliminó `next lint`: el script ahora es `eslint .`.
const config = [
  ...coreWebVitals,
  {
    rules: {
      // Imports y variables sin usar (código muerto): aviso, no error.
      "no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_", ignoreRestSiblings: true }],
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "public/**", "negocio/**", "design/**", "next-env.d.ts"],
  },
];

export default config;
