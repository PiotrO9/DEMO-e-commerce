import { FlatCompat } from '@eslint/eslintrc';
import withNuxt from './.nuxt/eslint.config.mjs';

const compat = new FlatCompat();

export default withNuxt({
    rules: {
        'curly': ['error', 'multi-line'],
        'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
}, ...compat.config({
    extends: ['plugin:tailwindcss/recommended'],
    rules: {
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/migration-from-tailwind-2': 'off'
    }
})).override('nuxt/stylistic', {
    rules: {
        '@stylistic/semi': 'error',
        '@stylistic/indent': ['error', 4],
        '@stylistic/member-delimiter-style': 'error',
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['const', 'let', 'var', 'if', 'for', 'while', 'do', 'switch', 'throw', 'try', 'export', 'type', 'interface'], next: ['*'] },
            { blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'if', 'for', 'while', 'do', 'switch', 'throw', 'try', 'export', 'type', 'interface', 'return'] },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
        ]
    }
}).override('nuxt/vue/rules', {
    rules: {
        'vue/no-v-html': 'off',
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': 'off',
        'vue/max-attributes-per-line': ['error', {
            singleline: 5,
            multiline: 1
        }]
    }
}).override('nuxt/typescript/rules', {
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-literal-enum-member': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off'
    }
});
