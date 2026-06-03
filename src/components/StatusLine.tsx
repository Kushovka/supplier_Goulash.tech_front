import type { ReactNode } from 'react';

type StatusLineProps = {
  children: string;
  icon: ReactNode;
};

const StatusLine = ({ children, icon }: StatusLineProps) => (
  <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
    {icon}
    {children}
  </div>
);

export default StatusLine;
