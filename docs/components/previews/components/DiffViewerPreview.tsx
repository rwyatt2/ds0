'use client';

import { DiffViewer } from '../../../../components/react/diff-viewer';

const oldValue = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}`;

const newValue = `function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
  console.log("Greeting sent.");
  return true;
}`;

export function DiffViewerPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl">
            <DiffViewer
                oldValue={oldValue}
                newValue={newValue}
                oldTitle="greet.js"
                newTitle="greet.ts"
            />
        </div>
    );
}
