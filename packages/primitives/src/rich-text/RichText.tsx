import React, { forwardRef } from 'react';
import { useRichText } from './useRichText';
import type { RichTextProps } from './RichText.types';
const RichTextPrimitive = forwardRef<HTMLDivElement, RichTextProps>(
    ({ value, defaultValue, onChange, onTextChange, placeholder, maxLength, isDisabled, isReadOnly, children, ...props }, ref) => {
        const { editorRef, editorProps, toolbarProps } = useRichText({ value, defaultValue, onChange, onTextChange, placeholder, maxLength, isDisabled, isReadOnly });
        return (<div ref={ref} {...props}>{children && <div {...toolbarProps}>{children}</div>}<div ref={editorRef} {...editorProps} /></div>);
    },
);
RichTextPrimitive.displayName = 'RichTextPrimitive';
export { RichTextPrimitive };
