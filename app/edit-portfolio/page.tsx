'use client';

import PortfolioForm from '@/components/edit-portfolio/PortfolioForm';
import ProfileForm from '@/components/edit-portfolio/ProfileForm';
import { client } from '@/lib/client';
import { loadPortfolio, portfolioSelector } from '@/store/reducers/portfolio';
import { IResponse } from '@/types/client';
import { IPortfolio } from '@/types/user';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditPortfolioPage = () => {
  const dispatch = useDispatch();
  const { portfolios, totalChanged, existingPortfolios } =
    useSelector(portfolioSelector);
  console.log(portfolios);
  console.log(existingPortfolios);
  // const [isChanged, setIsChanged] = useState(false);
  // const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);

  const getInitialData = useCallback(async () => {
    const { data, error }: IResponse = await client.get({
      url: `/users/${1}/portfolios`,
    });

    console.log(data);

    if (data) {
      // setPortfolios(data);
      dispatch(loadPortfolio(data));
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="submit"
        className={`mt-5 btn btn-md ${
          totalChanged > 0 ? 'btn-primary' : 'btn-disabled'
        }`}
      >
        Simpan Perubahan
      </button>
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
