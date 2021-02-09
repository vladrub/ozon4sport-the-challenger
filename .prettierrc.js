module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    endOfLine: "auto",
    plugins: ['@prettier/plugin-pug'],
    overrides: [
        {
            files: ['*.pug'],
            options: {
                pugSingleQuote: false,
                pugAttributeSeparator: 'none',
                pugClosingBracketPosition: 'new-line',
                pugPrintWidth: 1,
                pugSemi: false,
                pugWrapAttributesPattern: '0',
            },
        },
    ],
};
