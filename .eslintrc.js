module.exports = {
    env: {
        browser: true,
        es2021: true,
        jasmine: true,
    },
    extends: ["standard", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier", "jasmine"],
    rules: {},
};
