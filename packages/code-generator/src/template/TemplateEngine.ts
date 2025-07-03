import * as Handlebars from 'handlebars';
import { FileManager } from '../utils/FileManager';
import { TemplateData, GeneratorOptions } from '../types';
import {
    toCamelCase,
    toPascalCase,
    toKebabCase,
    toSnakeCase,
    pluralize,
    singularize,
} from '../utils/StringUtils';

export class TemplateEngine {
    private handlebars: typeof Handlebars;
    private fileManager: FileManager;

    constructor() {
        this.handlebars = Handlebars.create();
        this.fileManager = new FileManager();
        this.registerHelpers();
    }

    async render(
        templatePath: string,
        data: TemplateData,
        options: GeneratorOptions = {},
    ): Promise<string> {
        try {
            const templateContent =
                await this.fileManager.readFile(templatePath);
            const template = this.handlebars.compile(templateContent);

            const context = {
                ...data,
                options,
                timestamp: new Date().toISOString(),
                year: new Date().getFullYear(),
            };

            return template(context);
        } catch (error) {
            throw new Error(
                `Template rendering failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    }

    private registerHelpers(): void {
        // 문자열 변환 헬퍼들
        this.handlebars.registerHelper('camelCase', (str: string) =>
            toCamelCase(str),
        );
        this.handlebars.registerHelper('pascalCase', (str: string) =>
            toPascalCase(str),
        );
        this.handlebars.registerHelper('kebabCase', (str: string) =>
            toKebabCase(str),
        );
        this.handlebars.registerHelper('snakeCase', (str: string) =>
            toSnakeCase(str),
        );
        this.handlebars.registerHelper('pluralize', (str: string) =>
            pluralize(str),
        );
        this.handlebars.registerHelper('singularize', (str: string) =>
            singularize(str),
        );

        // 조건부 헬퍼들
        this.handlebars.registerHelper(
            'ifEquals',
            function (arg1, arg2, options) {
                return arg1 === arg2 ? options.fn(this) : options.inverse(this);
            },
        );

        this.handlebars.registerHelper(
            'ifNotEquals',
            function (arg1, arg2, options) {
                return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
            },
        );

        this.handlebars.registerHelper(
            'ifContains',
            function (array, value, options) {
                if (Array.isArray(array) && array.includes(value)) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
        );

        // 배열 헬퍼들
        this.handlebars.registerHelper('each', function (context, options) {
            if (Array.isArray(context)) {
                let result = '';
                for (let i = 0; i < context.length; i++) {
                    result += options.fn(context[i]);
                }
                return result;
            }
            return options.inverse(this);
        });

        this.handlebars.registerHelper(
            'join',
            function (array, separator = ', ') {
                return Array.isArray(array) ? array.join(separator) : '';
            },
        );

        // 날짜 헬퍼들
        this.handlebars.registerHelper(
            'formatDate',
            function (date, format = 'YYYY-MM-DD') {
                const d = new Date(date);
                return d.toISOString().split('T')[0];
            },
        );

        // 조건부 출력 헬퍼들
        this.handlebars.registerHelper(
            'optional',
            function (value, fallback = '') {
                return value || fallback;
            },
        );

        this.handlebars.registerHelper('capitalize', function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        });

        this.handlebars.registerHelper('lowercase', function (str) {
            return str.toLowerCase();
        });

        this.handlebars.registerHelper('uppercase', function (str) {
            return str.toUpperCase();
        });
    }
}
