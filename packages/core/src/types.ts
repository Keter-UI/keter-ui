import type { ElementType, ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react';

/** Extend a component's props with additional fields */
export type PropsWithClassName<T = unknown> = T & { className?: string };

/** Make all properties of T optional except those in K */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make all properties of T required except those in K */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Slot / polymorphic "as" prop type */
export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<C extends ElementType, Props = object> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>;

/** Size variants shared across components */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Intent/status variants */
export type IntentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/** Text direction */
export type Direction = 'ltr' | 'rtl';

/** Orientation */
export type Orientation = 'horizontal' | 'vertical';

/** Side positioning */
export type Side = 'top' | 'right' | 'bottom' | 'left';

/** Alignment */
export type Align = 'start' | 'center' | 'end';
