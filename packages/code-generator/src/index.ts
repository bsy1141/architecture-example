export { CodeGenerator } from './generator/CodeGenerator';
export { TemplateEngine } from './template/TemplateEngine';
export { FileManager } from './utils/FileManager';
export {
    GeneratorConfig,
    TemplateData,
    GeneratorOptions,
    ComponentType,
    FileType,
} from './types';

// 기본 제너레이터들
export { ReactComponentGenerator } from './generators/ReactComponentGenerator';
export { NestModuleGenerator } from './generators/NestModuleGenerator';
export { ApiGenerator } from './generators/ApiGenerator';

// 유틸리티 함수들
export {
    toCamelCase,
    toPascalCase,
    toKebabCase,
    toSnakeCase,
    pluralize,
    singularize,
} from './utils/StringUtils';
