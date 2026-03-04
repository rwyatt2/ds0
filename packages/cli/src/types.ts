export interface DS0Config {
    /** Where DS0 components are stored in the consumer project */
    componentsDir: string;
    /** Tailwind CSS config path */
    tailwindConfig: string;
    /** Global CSS file path */
    globalsCss: string;
    /** Path to the cn() utility */
    utilsPath: string;
    /** TypeScript or JavaScript */
    typescript: boolean;
    /** Package manager */
    packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun';
    /** Registry URL (for self-hosted or custom registries) */
    registryUrl: string;
}

export interface RegistryComponent {
    name: string;
    category: string;
    description: string;
    files: RegistryFile[];
    dependencies: string[];
    devDependencies: string[];
    registryDependencies: string[];
    decisionTree?: Record<string, unknown>;
}

export interface RegistryFile {
    path: string;
    content: string;
    type: 'component' | 'util' | 'style';
}

export interface RegistryRecipe {
    name: string;
    category: string;
    description: string;
    files: RegistryFile[];
    dependencies: string[];
    devDependencies: string[];
    registryDependencies: string[];
}

export interface Registry {
    version: string;
    components: Record<string, RegistryComponent>;
    recipes: Record<string, RegistryRecipe>;
}
