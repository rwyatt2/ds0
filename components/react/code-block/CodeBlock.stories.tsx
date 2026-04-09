import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';
const meta: Meta<typeof CodeBlock> = { title: 'Components/Data Display/CodeBlock', component: CodeBlock, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'ghost'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] }, showLineNumbers: { control: 'boolean' }, copyable: { control: 'boolean' } } };
export default meta;
type Story = StoryObj<typeof CodeBlock>;

const tsCode = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`;

export const Default: Story = { args: { code: tsCode, language: 'typescript' } };
export const WithTitle: Story = { args: { code: tsCode, language: 'typescript', title: 'Counter.tsx' } };
export const WithLineNumbers: Story = { args: { code: tsCode, language: 'typescript', showLineNumbers: true, title: 'Counter.tsx' } };
export const WithHighlightLines: Story = { args: { code: tsCode, language: 'typescript', showLineNumbers: true, highlightLines: [4, 5, 6], title: 'Counter.tsx' } };
export const Ghost: Story = { args: { code: tsCode, language: 'typescript', variant: 'ghost', title: 'Counter.tsx' } };
export const Small: Story = { args: { code: tsCode, size: 'sm', title: 'example.ts' } };
export const NoCopy: Story = { args: { code: 'echo "hello"', language: 'bash', copyable: false } };
