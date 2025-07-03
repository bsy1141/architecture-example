export interface GeneratorConfig {
    templatePath: string;
    outputPath: string;
    fileExtension: string;
    overwrite: boolean;
    createDirectory: boolean;
}

export interface TemplateData {
    name: string;
    type: ComponentType;
    props?: Record<string, any>;
    imports?: string[];
    exports?: string[];
    metadata?: Record<string, any>;
}

export interface GeneratorOptions {
    dryRun?: boolean;
    verbose?: boolean;
    force?: boolean;
    skipExisting?: boolean;
    backup?: boolean;
}

export type ComponentType =
    | 'component'
    | 'page'
    | 'hook'
    | 'service'
    | 'controller'
    | 'module'
    | 'dto'
    | 'entity'
    | 'interface'
    | 'type'
    | 'util';

export type FileType =
    | 'typescript'
    | 'javascript'
    | 'tsx'
    | 'jsx'
    | 'json'
    | 'css'
    | 'scss'
    | 'html'
    | 'md';

export interface FileInfo {
    path: string;
    content: string;
    type: FileType;
    encoding?: BufferEncoding;
}

export interface GenerationResult {
    success: boolean;
    files: FileInfo[];
    errors: string[];
    warnings: string[];
}

export interface TemplateContext {
    data: TemplateData;
    options: GeneratorOptions;
    helpers: Record<string, Function>;
}
