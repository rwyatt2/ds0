import React, { forwardRef, createContext, useContext, useId } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import type {
    FormProps,
    FormFieldProps,
    FormLabelProps,
    FormDescriptionProps,
    FormErrorProps,
    FormSectionProps,
    FormActionsProps,
} from '@ds0/primitives';

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

// ─── Variants ────────────────────────────────────────────────

const formVariants = cva('space-y-6', {
    variants: {
        layout: {
            vertical: 'flex flex-col',
            horizontal: 'flex flex-col',
        },
    },
    defaultVariants: {
        layout: 'vertical',
    },
});

const formFieldVariants = cva('space-y-2', {
    variants: {
        layout: {
            vertical: 'flex flex-col',
            horizontal: 'flex flex-row items-start gap-4',
        },
    },
    defaultVariants: {
        layout: 'vertical',
    },
});

const formActionsVariants = cva('flex gap-3 pt-4', {
    variants: {
        align: {
            left: 'justify-start',
            center: 'justify-center',
            right: 'justify-end',
            apart: 'justify-between',
        },
    },
    defaultVariants: {
        align: 'right',
    },
});

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Form component.
 * Provides layout structure and manages field composition.
 *
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <Form.Field name="email" required>
 *     <Form.Label>Email</Form.Label>
 *     <Input type="email" />
 *     <Form.Error>Email is required</Form.Error>
 *   </Form.Field>
 *   <Form.Actions>
 *     <Button type="submit">Submit</Button>
 *   </Form.Actions>
 * </Form>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/form | Documentation}
 */
const FormRoot = forwardRef<HTMLFormElement, FormProps>(
    ({ children, layout = 'vertical', className, onSubmit, ...props }, ref) => (
        <form
            ref={ref}
            className={cn(formVariants({ layout }), className)}
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

FormRoot.displayName = 'Form';

// ─── Field ────────────────────────────────────────────────────

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
    ({ name, required = false, hasError = false, layout = 'vertical', children, className, ...props }, ref) => {
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
                <div ref={ref} className={cn(formFieldVariants({ layout }), className)} role="group" {...props}>
                    {children}
                </div>
            </FieldContext.Provider>
        );
    },
);

FormField.displayName = 'FormField';

// ─── Label ────────────────────────────────────────────────────

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ children, required, className, ...props }, ref) => {
        const field = useFieldContext();

        return (
            <label
                ref={ref}
                htmlFor={field?.id}
                className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
                {...props}
            >
                {children}
                {(required || field?.required) && (
                    <span className="text-destructive ml-1" aria-hidden="true">*</span>
                )}
            </label>
        );
    },
);

FormLabel.displayName = 'FormLabel';

// ─── Description ──────────────────────────────────────────────

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
    ({ children, className, ...props }, ref) => {
        const field = useFieldContext();

        return (
            <p ref={ref} id={field?.descriptionId} className={cn('text-sm text-muted-foreground', className)} {...props}>
                {children}
            </p>
        );
    },
);

FormDescription.displayName = 'FormDescription';

// ─── Error ────────────────────────────────────────────────────

const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
    ({ children, className, ...props }, ref) => {
        const field = useFieldContext();

        return (
            <p ref={ref} id={field?.errorId} role="alert" className={cn('text-sm text-destructive font-medium', className)} {...props}>
                {children}
            </p>
        );
    },
);

FormError.displayName = 'FormError';

// ─── Section ──────────────────────────────────────────────────

const FormSection = forwardRef<HTMLFieldSetElement, FormSectionProps>(
    ({ title, description, children, className, ...props }, ref) => (
        <fieldset ref={ref} className={cn('space-y-4 border-none p-0', className)} {...props}>
            {title && <legend className="text-base font-semibold">{title}</legend>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            <div className="space-y-4">
                {children}
            </div>
        </fieldset>
    ),
);

FormSection.displayName = 'FormSection';

// ─── Actions ──────────────────────────────────────────────────

const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
    ({ align = 'right', children, className, ...props }, ref) => (
        <div ref={ref} className={cn(formActionsVariants({ align }), className)} role="group" {...props}>
            {children}
        </div>
    ),
);

FormActions.displayName = 'FormActions';

// ─── Compound Export ─────────────────────────────────────────

const Form = Object.assign(FormRoot, {
    Field: FormField,
    Label: FormLabel,
    Description: FormDescription,
    Error: FormError,
    Section: FormSection,
    Actions: FormActions,
});

export {
    Form,
    FormField,
    FormLabel,
    FormDescription,
    FormError,
    FormSection,
    FormActions,
    formVariants,
    formFieldVariants,
    formActionsVariants,
};
