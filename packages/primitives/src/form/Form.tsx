import React, { forwardRef, createContext, useContext, useId } from 'react';

import type {
    FormProps,
    FormFieldProps,
    FormLabelProps,
    FormDescriptionProps,
    FormErrorProps,
    FormSectionProps,
    FormActionsProps,
} from './Form.types';

// ─── Field Context ────────────────────────────────────────────

interface FieldContextValue {
    id: string;
    errorId: string;
    descriptionId: string;
    name: string;
    hasError: boolean;
    required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(): FieldContextValue | null {
    return useContext(FieldContext);
}

// ─── Root ─────────────────────────────────────────────────────

const FormPrimitive = forwardRef<HTMLFormElement, FormProps>(
    ({ children, className, layout: _, onSubmit, ...props }, ref) => (
        <form
            ref={ref}
            className={className}
            noValidate
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
            }}
            {...props}
        >
            {children}
        </form>
    ),
);

FormPrimitive.displayName = 'FormPrimitive';

// ─── Field ────────────────────────────────────────────────────

const FormFieldPrimitive = forwardRef<HTMLDivElement, FormFieldProps>(
    ({ name, required = false, hasError = false, layout: _l, children, className, ...props }, ref) => {
        const baseId = useId();
        const contextValue: FieldContextValue = {
            id: `${baseId}-${name}`,
            errorId: `${baseId}-${name}-error`,
            descriptionId: `${baseId}-${name}-desc`,
            name,
            hasError,
            required,
        };

        return (
            <FieldContext.Provider value={contextValue}>
                <div ref={ref} className={className} role="group" {...props}>
                    {children}
                </div>
            </FieldContext.Provider>
        );
    },
);

FormFieldPrimitive.displayName = 'FormFieldPrimitive';

// ─── Label ────────────────────────────────────────────────────

const FormLabelPrimitive = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ children, required, className, ...props }, ref) => {
        const field = useFieldContext();

        return (
            <label
                ref={ref}
                htmlFor={field?.id}
                className={className}
                {...props}
            >
                {children}
                {(required || field?.required) && <span aria-hidden="true"> *</span>}
            </label>
        );
    },
);

FormLabelPrimitive.displayName = 'FormLabelPrimitive';

// ─── Description ──────────────────────────────────────────────

const FormDescriptionPrimitive = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
    ({ children, className, ...props }, ref) => {
        const field = useFieldContext();

        return (
            <p ref={ref} id={field?.descriptionId} className={className} {...props}>
                {children}
            </p>
        );
    },
);

FormDescriptionPrimitive.displayName = 'FormDescriptionPrimitive';

// ─── Error ────────────────────────────────────────────────────

const FormErrorPrimitive = forwardRef<HTMLParagraphElement, FormErrorProps>(
    ({ children, className, ...props }, ref) => {
        const field = useFieldContext();

        return (
            <p ref={ref} id={field?.errorId} role="alert" className={className} {...props}>
                {children}
            </p>
        );
    },
);

FormErrorPrimitive.displayName = 'FormErrorPrimitive';

// ─── Section ──────────────────────────────────────────────────

const FormSectionPrimitive = forwardRef<HTMLFieldSetElement, FormSectionProps>(
    ({ title, description, children, className, ...props }, ref) => (
        <fieldset ref={ref} className={className} {...props}>
            {title && <legend>{title}</legend>}
            {description && <p>{description}</p>}
            {children}
        </fieldset>
    ),
);

FormSectionPrimitive.displayName = 'FormSectionPrimitive';

// ─── Actions ──────────────────────────────────────────────────

const FormActionsPrimitive = forwardRef<HTMLDivElement, FormActionsProps>(
    ({ children, className, align: _a, ...props }, ref) => (
        <div ref={ref} className={className} role="group" {...props}>
            {children}
        </div>
    ),
);

FormActionsPrimitive.displayName = 'FormActionsPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export {
    FormPrimitive,
    FormFieldPrimitive,
    FormLabelPrimitive,
    FormDescriptionPrimitive,
    FormErrorPrimitive,
    FormSectionPrimitive,
    FormActionsPrimitive,
    useFieldContext,
};
