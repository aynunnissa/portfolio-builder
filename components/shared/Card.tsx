import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-md shadow p-4 bg-white">{children}</div>;
};

export default Card;
