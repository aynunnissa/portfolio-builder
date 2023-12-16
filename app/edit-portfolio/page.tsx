'use client';

import PortfolioForm from '@/components/edit-portfolio/PortfolioForm';
import ProfileForm from '@/components/edit-portfolio/ProfileForm';
import { client } from '@/lib/client';
import { IResponse } from '@/types/client';
import { IPortfolio } from '@/types/user';
import { useCallback, useEffect, useState } from 'react';

const EditPortfolioPage = () => {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);

  const getInitialData = useCallback(async () => {
    const { data, error }: IResponse = await client.get({
      url: `/users/${1}/portfolios`,
    });

    console.log(data);

    if (data) {
      setPortfolios(data);
    }
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded shadow p-4">
        <ProfileForm />
      </div>
      <div className="rounded shadow p-4">
        {portfolios?.map(portfolio => (
          <PortfolioForm
            key={`portfolio-${portfolio.id}`}
            portfolio={portfolio}
          />
        ))}
      </div>
    </div>
  );
};

export default EditPortfolioPage;
