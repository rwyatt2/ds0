import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

export function ensureDir(dirPath: string): void {
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
    }
}

export function writeFile(filePath: string, content: string): void {
    ensureDir(dirname(filePath));
    writeFileSync(filePath, content, 'utf-8');
}

export function fileExists(filePath: string): boolean {
    return existsSync(filePath);
}

export function readFile(filePath: string): string {
    return readFileSync(filePath, 'utf-8');
}

export function resolveComponentPath(cwd: string, componentsDir: string, componentName: string, fileName: string): string {
    return join(cwd, componentsDir, componentName, fileName);
}
