import React from 'react';

/**
 * Props for the useForm hook.
 */
export interface UseFormProps {
    /** Called on form submit */
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Return value of the useForm hook.
 */
export interface UseFormReturn {
    /** Props to spread onto the form element */
    formProps: React.FormHTMLAttributes<HTMLFormElement>;
    /** Generate an ID pair for field label/input connection */
    getFieldId: (name: string) => string;
    /** Generate an error ID for aria-describedby */
    getErrorId: (name: string) => string;
    /** Generate a description ID for aria-describedby */
    getDescriptionId: (name: string) => string;
}

/**
 * Props for the Form root component.
 */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    /** Layout direction */
    layout?: 'vertical' | 'horizontal';
    /** Additional CSS classes */
    className?: string;
    children: React.ReactNode;
}

/**
 * Props for Form.Field.
 */
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Field name - used for generating connected IDs */
    name: string;
    /** Whether the field is required */
    required?: boolean;
    /** Whether the field has an error */
    hasError?: boolean;
    /** Layout direction */
    layout?: 'vertical' | 'horizontal';
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Form.Label.
 */
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    required?: boolean;
    className?: string;
}

/**
 * Props for Form.Description.
 */
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Form.Error.
 */
export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Form.Section.
 */
export interface FormSectionProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    /** Section title */
    title?: string;
    /** Section description */
    description?: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Form.Actions.
 */
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Alignment of action buttons */
    align?: 'left' | 'center' | 'right' | 'apart';
    children: React.ReactNode;
    className?: string;
}

/**
 * Styled props (same as primitive).
 */
export type StyledFormProps = FormProps;
