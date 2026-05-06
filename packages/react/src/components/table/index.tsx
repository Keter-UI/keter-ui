'use client';

import React, { useState } from 'react';
import { cn } from '@keter-ui/core';

// ─── Primitives ──────────────────────────────────────────────────────────────

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:border-zinc-200 dark:[&_tr]:border-zinc-800', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
);
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t border-zinc-200 bg-zinc-50/50 font-medium dark:border-zinc-800 dark:bg-zinc-900/20 [&>tr]:last:border-b-0', className)} {...props} />
  )
);
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-zinc-100 dark:border-zinc-900',
        'transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40',
        'data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-4 text-start text-xs font-semibold uppercase tracking-wider',
        'text-zinc-500 dark:text-zinc-400',
        'bg-zinc-50 dark:bg-zinc-900/50',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 align-middle', className)} {...props} />
  )
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-zinc-500 dark:text-zinc-400', className)} {...props} />
  )
);
TableCaption.displayName = 'TableCaption';

// ─── Sortable Data Table ──────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: ColumnDef<T>[];
  caption?: string;
  stickyHeader?: boolean;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

function SortIcon({ dir }: { dir: SortDirection }) {
  return (
    <svg viewBox="0 0 16 16" className="ms-1.5 inline h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'asc' ? 'M4 10l4-4 4 4' : dir === 'desc' ? 'M4 6l4 4 4-4' : 'M4 6l4-4 4 4M4 10l4 4 4-4'} opacity={dir === null ? 0.3 : 1} />
    </svg>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  caption,
  stickyHeader,
  selectable,
  onRowClick,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<(keyof T & string) | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (key: keyof T & string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  };

  const sorted = sortKey && sortDir
    ? [...data].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = av === bv ? 0 : av! < bv! ? -1 : 1;
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : data;

  const toggleRow = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
  };

  const toggleAll = () => {
    setSelected(selected.size === sorted.length ? new Set() : new Set(sorted.map((_, i) => i)));
  };

  const alignClass: Record<string, string> = {
    start: 'text-start',
    center: 'text-center',
    end: 'text-end',
  };

  return (
    <Table className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className={stickyHeader ? 'sticky top-0 z-10' : ''}>
        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
          {selectable && (
            <TableHead className="w-10 px-4">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
                checked={selected.size === sorted.length && sorted.length > 0}
                onChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
          )}
          {columns.map((col) => (
            <TableHead
              key={col.key}
              style={col.width ? { width: col.width } : undefined}
              className={cn(col.align && alignClass[col.align], col.sortable && 'cursor-pointer select-none hover:text-zinc-900 dark:hover:text-zinc-50')}
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
              aria-sort={
                sortKey === col.key
                  ? sortDir === 'asc' ? 'ascending' : 'descending'
                  : col.sortable ? 'none' : undefined
              }
            >
              {col.header}
              {col.sortable && (
                <SortIcon dir={sortKey === col.key ? sortDir : null} />
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={columns.length + (selectable ? 1 : 0)}
              className="h-32 text-center text-zinc-400 dark:text-zinc-500"
            >
              {emptyState ?? 'No results.'}
            </TableCell>
          </TableRow>
        ) : (
          sorted.map((row, i) => (
            <TableRow
              key={i}
              data-selected={selectable && selected.has(i)}
              onClick={() => { if (selectable) toggleRow(i); onRowClick?.(row); }}
              className={onRowClick ? 'cursor-pointer' : ''}
            >
              {selectable && (
                <TableCell className="w-10">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
                    checked={selected.has(i)}
                    onChange={() => toggleRow(i)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select row ${i + 1}`}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.key} className={cn(col.align && alignClass[col.align])}>
                  {col.cell ? col.cell(row[col.key], row) : String(row[col.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
