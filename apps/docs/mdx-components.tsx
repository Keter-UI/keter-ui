import { useMDXComponents as useNextraMDXComponents } from 'nextra/mdx-components';
import type { MDXComponents } from 'mdx/types';
import React from 'react';

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return useNextraMDXComponents({
    // Code block wrapper
    pre: ({ children, ...props }) => (
      <pre
        {...props}
        className="overflow-x-auto rounded-lg border border-secondary-200 bg-secondary-50 p-4 text-sm leading-relaxed"
      >
        {children}
      </pre>
    ),
    // Inline code
    code: ({ children, ...props }) => (
      <code
        {...props}
        className="rounded bg-secondary-100 px-1.5 py-0.5 text-sm font-mono text-primary-700"
      >
        {children}
      </code>
    ),
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-secondary-900 mb-4 tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-secondary-800 mt-10 mb-4 tracking-tight border-b border-secondary-100 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-secondary-700 mt-8 mb-3">{children}</h3>
    ),
    // Props table wrapper
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-secondary-100">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-start text-xs font-semibold text-secondary-600 uppercase bg-secondary-50">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-secondary-700 border-t border-secondary-50">{children}</td>
    ),
    // Callouts
    blockquote: ({ children }) => (
      <blockquote className="border-s-4 border-primary-500 bg-primary-50/50 px-4 py-3 my-4 rounded-e-lg text-secondary-700">
        {children}
      </blockquote>
    ),
    ...components,
  });
}
