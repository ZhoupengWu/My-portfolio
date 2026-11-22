export const STATUS_LABELS = {
  'in-progress': 'In progress',
  completed: 'Completed',
} as const;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const formatPeriod = (start: Date, end?: Date) =>
  end ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(start);
