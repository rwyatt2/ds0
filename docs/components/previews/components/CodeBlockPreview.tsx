'use client';

import { CodeBlock } from '../../../../components/react/code-block';
import { Stack } from '../../../../components/react/stack';

const sampleCode = `import { Button } from '@ds0/react';

export function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`;

const cssCode = `.button {
  background: var(--color-primary);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}`;

export function CodeBlockPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-2xl">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Default with title</p>
                <CodeBlock code={sampleCode} language="tsx" title="App.tsx" />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">With line numbers &amp; highlighted lines</p>
                <CodeBlock code={sampleCode} language="tsx" showLineNumbers highlightLines={[5, 6, 7]} title="Highlighted" />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Ghost variant</p>
                <CodeBlock code={cssCode} language="css" variant="ghost" title="styles.css" />
            </div>
        </Stack>
    );
}
