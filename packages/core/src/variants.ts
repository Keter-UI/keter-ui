import { cn } from './cn.js';

type ClassValue = string | undefined | null | false | ClassValue[];

type VariantRecord = Record<string, Record<string, ClassValue>>;

type VariantProps<T extends VariantRecord> = {
  [K in keyof T]?: keyof T[K];
};

type CompoundVariant<T extends VariantRecord> = VariantProps<T> & {
  class: ClassValue;
};

export interface VariantsConfig<T extends VariantRecord> {
  base?: ClassValue;
  variants?: T;
  compoundVariants?: CompoundVariant<T>[];
  defaultVariants?: VariantProps<T>;
}

export type InferVariantProps<T> = T extends (props?: infer P) => string ? P : never;

export function variants<T extends VariantRecord>(config: VariantsConfig<T>) {
  return function resolve(props?: VariantProps<T> & { class?: ClassValue; className?: ClassValue }): string {
    const { class: classProp, className, ...variantProps } = (props ?? {}) as Record<string, unknown>;

    const merged: Record<string, string> = {};

    // Apply defaults first, then passed props
    for (const [key, defaultValue] of Object.entries(config.defaultVariants ?? {})) {
      merged[key] = String(defaultValue);
    }
    for (const [key, value] of Object.entries(variantProps)) {
      if (value !== undefined) merged[key] = String(value);
    }

    // Collect variant classes
    const variantClasses: ClassValue[] = [];
    if (config.variants) {
      for (const [key, variantMap] of Object.entries(config.variants)) {
        const selected = merged[key];
        if (selected !== undefined && variantMap[selected] !== undefined) {
          variantClasses.push(variantMap[selected] as ClassValue);
        }
      }
    }

    // Collect compound variant classes
    const compoundClasses: ClassValue[] = [];
    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, ...conditions } = compound;
        const matches = Object.entries(conditions).every(
          ([key, value]) => merged[key] === String(value)
        );
        if (matches) compoundClasses.push(compoundClass as ClassValue);
      }
    }

    return cn(
      config.base as ClassValue,
      ...variantClasses,
      ...compoundClasses,
      classProp as ClassValue,
      className as ClassValue
    );
  };
}
