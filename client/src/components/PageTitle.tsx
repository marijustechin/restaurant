import { ReactNode } from 'react';

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-center shadow-text text-3xl mt-2 mb-3">{children}</h1>
  );
};
