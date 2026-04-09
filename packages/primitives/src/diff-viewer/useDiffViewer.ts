import type { UseDiffViewerProps, UseDiffViewerReturn, DiffLine } from './DiffViewer.types';

function computeDiff(oldVal: string, newVal: string): DiffLine[] {
    const oldLines = oldVal.split('\n');
    const newLines = newVal.split('\n');
    const lines: DiffLine[] = [];
    let oldIdx = 0, newIdx = 0;

    while (oldIdx < oldLines.length || newIdx < newLines.length) {
        if (oldIdx < oldLines.length && newIdx < newLines.length && oldLines[oldIdx] === newLines[newIdx]) {
            lines.push({ type: 'context', content: oldLines[oldIdx], oldLineNumber: oldIdx + 1, newLineNumber: newIdx + 1 });
            oldIdx++; newIdx++;
        } else if (oldIdx < oldLines.length && (newIdx >= newLines.length || !newLines.includes(oldLines[oldIdx]))) {
            lines.push({ type: 'remove', content: oldLines[oldIdx], oldLineNumber: oldIdx + 1 });
            oldIdx++;
        } else if (newIdx < newLines.length) {
            lines.push({ type: 'add', content: newLines[newIdx], newLineNumber: newIdx + 1 });
            newIdx++;
        }
    }
    return lines;
}

export function useDiffViewer(props: UseDiffViewerProps): UseDiffViewerReturn {
    const { oldValue, newValue } = props;
    const lines = computeDiff(oldValue, newValue);
    const added = lines.filter(l => l.type === 'add').length;
    const removed = lines.filter(l => l.type === 'remove').length;

    return {
        diffViewerProps: { role: 'region', 'aria-label': `Diff: ${added} additions, ${removed} deletions` },
        lines,
        stats: { added, removed },
    };
}
