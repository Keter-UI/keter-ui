/**
 * Helpers for logical properties (compatible with Tailwind/Standard CSS)
 */
export const logicalProps = {
  marginInlineStart: (value: string | number) => ({ marginInlineStart: value }),
  marginInlineEnd: (value: string | number) => ({ marginInlineEnd: value }),
  paddingInlineStart: (value: string | number) => ({ paddingInlineStart: value }),
  paddingInlineEnd: (value: string | number) => ({ paddingInlineEnd: value }),
};
