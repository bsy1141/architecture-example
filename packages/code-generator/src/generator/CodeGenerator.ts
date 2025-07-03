import { TemplateEngine } from '../template/TemplateEngine';
import { FileManager } from '../utils/FileManager';
import {
    GeneratorConfig,
    TemplateData,
    GeneratorOptions,
    GenerationResult,
    FileInfo,
} from '../types';

export class CodeGenerator {
    private templateEngine: TemplateEngine;
    private fileManager: FileManager;
    private config: GeneratorConfig;

    constructor(config: GeneratorConfig) {
        this.config = config;
        this.templateEngine = new TemplateEngine();
        this.fileManager = new FileManager();
    }

    async generate(
        data: TemplateData,
        options: GeneratorOptions = {},
    ): Promise<GenerationResult> {
        const result: GenerationResult = {
            success: true,
            files: [],
            errors: [],
            warnings: [],
        };

        try {
            // 템플릿 렌더링
            const renderedContent = await this.templateEngine.render(
                this.config.templatePath,
                data,
                options,
            );

            // 출력 파일 정보 생성
            const fileName = this.generateFileName(data.name, data.type);
            const outputPath = this.getOutputPath(fileName);

            const fileInfo: FileInfo = {
                path: outputPath,
                content: renderedContent,
                type: this.getFileType(fileName),
                encoding: 'utf8',
            };

            // 파일 쓰기
            if (!options.dryRun) {
                await this.fileManager.writeFile(fileInfo, {
                    overwrite: this.config.overwrite,
                    createDirectory: this.config.createDirectory,
                    backup: options.backup,
                });
            }

            result.files.push(fileInfo);

            if (options.verbose) {
                console.log(`Generated: ${outputPath}`);
            }
        } catch (error) {
            result.success = false;
            result.errors.push(
                error instanceof Error ? error.message : 'Unknown error',
            );
        }

        return result;
    }

    private generateFileName(name: string, type: string): string {
        const extension = this.config.fileExtension;

        switch (type) {
            case 'component':
                return `${name}.component${extension}`;
            case 'service':
                return `${name}.service${extension}`;
            case 'controller':
                return `${name}.controller${extension}`;
            case 'module':
                return `${name}.module${extension}`;
            case 'dto':
                return `${name}.dto${extension}`;
            case 'entity':
                return `${name}.entity${extension}`;
            case 'interface':
                return `${name}.interface${extension}`;
            case 'type':
                return `${name}.types${extension}`;
            case 'hook':
                return `use${name}${extension}`;
            case 'util':
                return `${name}.utils${extension}`;
            default:
                return `${name}${extension}`;
        }
    }

    private getOutputPath(fileName: string): string {
        return `${this.config.outputPath}/${fileName}`;
    }

    private getFileType(fileName: string): any {
        const extension = fileName.split('.').pop();

        switch (extension) {
            case 'ts':
                return 'typescript';
            case 'tsx':
                return 'tsx';
            case 'js':
                return 'javascript';
            case 'jsx':
                return 'jsx';
            case 'json':
                return 'json';
            case 'css':
                return 'css';
            case 'scss':
                return 'scss';
            case 'html':
                return 'html';
            case 'md':
                return 'md';
            default:
                return 'typescript';
        }
    }
}
