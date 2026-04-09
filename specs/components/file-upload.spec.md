# Component Spec: FileUpload

## 1. Overview

**Name:** FileUpload
**Category:** Data Input
**Description:** A file selection component with drag-and-drop zone, file browser integration, upload progress, file list display, and validation.

## 2. Use Cases

### Use When
* Uploading documents, images, or media files
* Profile picture or avatar upload
* Bulk file upload interfaces
* Form attachments

### Don't Use When
* Selecting from existing files in a system → use a file browser/TreeView
* Rich text with inline images → use RichText editor
* Capturing photos → use camera integration

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `dropzone` | Large drag-and-drop area | Primary upload interface |
| `button` | Simple file picker button | Compact inline upload |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | py-4 text-xs | Compact forms, inline |
| `md` | py-8 text-sm | Default dropzone |
| `lg` | py-12 text-base | Prominent upload area |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Dashed border, upload icon | Click or drag to add files |
| Hover | Border color change | Visual feedback |
| Drag Over | Accent border, background tint | File hover detected |
| Uploading | Progress bar per file | Files being uploaded |
| Complete | Success icon, file list shown | Upload finished |
| Error | Destructive border, error message | Validation or upload failure |
| Disabled | Reduced opacity | No interaction |

## 6. Anatomy

```
┌─ FileUpload ────────────────────────────────────┐
│                                                   │
│  ┌─ Dropzone ──────────────────────────────────┐ │
│  │                                              │ │
│  │         ⬆  Upload Icon                      │ │
│  │                                              │ │
│  │    Drag & drop files here, or click to       │ │
│  │    browse                                    │ │
│  │                                              │ │
│  │    Accepted: .jpg, .png, .pdf (max 5MB)      │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  ┌─ FileList ──────────────────────────────────┐ │
│  │  ┌─ FileItem ──────────────────────────┐    │ │
│  │  │ 📄 document.pdf  2.3MB  ████░░ 60%  ✕ │  │ │
│  │  └─────────────────────────────────────┘    │ │
│  │  ┌─ FileItem ──────────────────────────┐    │ │
│  │  │ 🖼 photo.jpg     1.1MB  ✓ Complete   ✕ │  │ │
│  │  └─────────────────────────────────────┘    │ │
│  └──────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| FileUpload (root) | Yes | Container with drag events |
| FileUploadDropzone | Yes (dropzone variant) | Drag-and-drop area |
| FileUploadTrigger | Yes | Click to open file browser |
| FileUploadList | No | List of added files |
| FileUploadItem | No | Individual file with progress |
| FileUploadItemPreview | No | File type icon or thumbnail |
| FileUploadItemProgress | No | Upload progress bar |
| FileUploadItemRemove | No | Remove file button |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `accept` | `string` | — | No | Accepted file types (MIME or extensions) |
| `maxFiles` | `number` | — | No | Maximum number of files |
| `maxSize` | `number` | — | No | Maximum file size in bytes |
| `multiple` | `boolean` | `false` | No | Allow multiple file selection |
| `onFilesChange` | `(files: File[]) => void` | — | No | File list change handler |
| `onUpload` | `(files: File[]) => Promise<void>` | — | No | Upload handler |
| `variant` | `'dropzone' \| 'button'` | `'dropzone'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Dropzone size |
| `isDisabled` | `boolean` | `false` | No | Disable the uploader |
| `children` | `ReactNode` | — | No | Custom dropzone content |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses `role="button"` for the dropzone with `aria-label`.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Enter` / `Space` | Open file browser dialog |
| `Tab` | Navigate between upload zone and file items |
| `Delete` / `Backspace` | Remove focused file from list |
| `Escape` | Cancel current upload (if applicable) |

### Screen Reader Behavior
* Dropzone announces "Upload area, press Enter to browse files"
* File additions announced via aria-live
* Upload progress announced periodically
* Errors announced immediately

### ARIA Attributes
* `role="button"` on dropzone
* `aria-label="Upload files"` on dropzone
* `aria-disabled` when disabled
* `aria-live="polite"` on file list for dynamic updates
* `aria-describedby` linking to format/size constraints

### WAI-ARIA Pattern
No specific WAI-ARIA pattern — uses button + live region patterns.

## 9. Composition Examples

### Basic Usage
```tsx
<FileUpload onFilesChange={setFiles} accept=".jpg,.png,.pdf" maxSize={5000000}>
  <FileUploadDropzone>
    <p>Drag & drop files here</p>
  </FileUploadDropzone>
  <FileUploadList />
</FileUpload>
```

### Button Variant
```tsx
<FileUpload variant="button" onFilesChange={setFiles}>
  <FileUploadTrigger>
    <Button variant="outline">Choose File</Button>
  </FileUploadTrigger>
</FileUpload>
```

### In a Form
```tsx
<FormField>
  <FormLabel>Attachments</FormLabel>
  <FormControl>
    <FileUpload accept=".pdf" maxFiles={3} multiple onFilesChange={setAttachments}>
      <FileUploadDropzone />
      <FileUploadList />
    </FileUpload>
  </FormControl>
  <FormMessage />
</FormField>
```

## 10. Decision Tree

```yaml
- condition: Does the user need to add files from their device?
  yes:
    - condition: Large upload area with drag-and-drop?
      yes: Use FileUpload variant="dropzone"
      no: Use FileUpload variant="button"
  no:
    - condition: Selecting from existing system files?
      yes: Use TreeView or file browser
      no: No file component needed
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Button | Used for trigger in button variant |
| Progress | Upload progress indication |
| Input | Alternative for simple file input |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.border` | Dropzone border (dashed) |
| `color.primary` | Drag-over border accent |
| `color.destructive` | Error state border |
| `color.muted-foreground` | Helper text, file info |
| `spacing.4` | Gap between file items |
| `radius.lg` | Dropzone corners |

## 13. Open Questions

* Should FileUpload handle the actual upload or only file selection?
* Should image files show inline thumbnail previews?
