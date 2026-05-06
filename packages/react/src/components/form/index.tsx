'use client';

import React, { createContext, useContext } from 'react';
import {
  useForm,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
  type RegisterOptions,
  useFormContext,
  FormProvider as RHFProvider,
} from 'react-hook-form';
import { cn } from '@keter-ui/core';

// ─── FormContext ──────────────────────────────────────────────────────────────

interface FormFieldCtx {
  name: string;
  id: string;
}

const FormFieldContext = createContext<FormFieldCtx>({ name: '', id: '' });

export const useFormField = () => {
  const fieldCtx = useContext(FormFieldContext);
  const { formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(fieldCtx.name, formState);

  return {
    id: fieldCtx.id,
    name: fieldCtx.name,
    formItemId: `${fieldCtx.id}-form-item`,
    formDescriptionId: `${fieldCtx.id}-form-item-description`,
    formMessageId: `${fieldCtx.id}-form-item-message`,
    ...fieldState,
  };
};

// ─── Form ─────────────────────────────────────────────────────────────────────

export interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export function Form<T extends FieldValues>({ form, onSubmit, children, className, ...props }: FormProps<T>) {
  return (
    <RHFProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4', className)} noValidate {...props}>
        {children}
      </form>
    </RHFProvider>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────

export interface FormFieldProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField = ({ name, children, className }: FormFieldProps) => {
  const id = React.useId();
  return (
    <FormFieldContext.Provider value={{ name, id }}>
      <div className={cn('space-y-1.5', className)}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};

// ─── FormLabel ────────────────────────────────────────────────────────────────

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const FormLabel = ({ className, required, optional, children, ...props }: FormLabelProps) => {
  const { formItemId, error } = useFormField();
  return (
    <label
      htmlFor={formItemId}
      className={cn(
        'block text-sm font-medium leading-none',
        error ? 'text-red-500' : 'text-zinc-700 dark:text-zinc-300',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ms-1 text-red-500">*</span>}
      {optional && <span className="ms-1 text-xs font-normal text-zinc-400">(optional)</span>}
    </label>
  );
};

// ─── FormControl ──────────────────────────────────────────────────────────────

export const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { formItemId, formDescriptionId, formMessageId, error } = useFormField();
    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={
          !error
            ? formDescriptionId
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        className={className}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

// ─── FormDescription ──────────────────────────────────────────────────────────

export const FormDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      id={formDescriptionId}
      className={cn('text-xs text-zinc-500 dark:text-zinc-400', className)}
      {...props}
    />
  );
};

// ─── FormMessage ──────────────────────────────────────────────────────────────

export const FormMessage = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { formMessageId, error } = useFormField();
  const body = error?.message ? String(error.message) : children;
  if (!body) return null;

  return (
    <p
      id={formMessageId}
      role="alert"
      className={cn('text-xs font-medium text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  );
};

// ─── Re-export useForm for convenience ────────────────────────────────────────

export { useForm };
export type { UseFormReturn, FieldValues, SubmitHandler, RegisterOptions };
