'use client';

import PortfolioForm from '@/components/edit-portfolio/PortfolioForm';
import ProfileForm from '@/components/edit-portfolio/ProfileForm';
import { client } from '@/lib/client';
import {
  addNewPortfolio,
  loadPortfolio,
  portfolioSelector,
} from '@/store/reducers/portfolio';
import { IResponse } from '@/types/client';
import { INewPortfolio, IPortfolio } from '@/types/user';
import axios from 'axios';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditPortfolioPage = () => {
  const dispatch = useDispatch();
  const { portfolios, totalChanged, existingPortfolios, newPortfolios } =
    useSelector(portfolioSelector);
  console.log(newPortfolios);
  // console.log(existingPortfolios);
  // const [newPortfolios, setNewPortfolios] = useState<Object[]>([]);
  // console.log(newPortfolios);
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

  const addNewPortfolioForm = () => {
    dispatch(
      addNewPortfolio({
        name: '',
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      })
    );
  };

  const submitNewPortfolioData = () => {
    const url = '/users/1/portfolios';

    axios
      .all(newPortfolios.map(newPort => client.post({ url, data: newPort })))
      .then(data => console.log(data));
  };
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
      <button type="button" name="add portfolio" onClick={addNewPortfolioForm}>
        Add portfolio
      </button>
      <div className="rounded shadow p-4">
        <form>
          {newPortfolios?.map((portfolio, ind) => (
            <PortfolioForm
              key={`newPortfolio-${ind}`}
              newPortfolio={portfolio}
            />
          ))}
          <button type="button" onClick={submitNewPortfolioData}>
            Submit All
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolioPage;
