import type { Meta, StoryObj } from '@storybook/react';
import { DiffViewer } from './DiffViewer';
const meta: Meta<typeof DiffViewer> = { title: 'Components/Data Display/DiffViewer', component: DiffViewer, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof DiffViewer>;
const oldCode = `function greet(name) {\n  console.log("Hello, " + name);\n  return true;\n}`;
const newCode = `function greet(name: string) {\n  console.log(\`Hello, \${name}\`);\n  return true;\n}\n\nexport { greet };`;
export const Default: Story = { args: { oldValue: oldCode, newValue: newCode, title: 'greet.ts' } };
export const Dark: Story = { args: { oldValue: oldCode, newValue: newCode, variant: 'dark', title: 'greet.ts' } };
