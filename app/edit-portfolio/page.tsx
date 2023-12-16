'use client';

import NewPortfolioForm from '@/components/edit-portfolio/NewPortfolioForm';
import PortfolioForm from '@/components/edit-portfolio/PortfolioForm';
import PreviewButton from '@/components/edit-portfolio/PreviewButton';
import PreviewContent from '@/components/edit-portfolio/PreviewContent';
import PreviewModal from '@/components/edit-portfolio/PreviewModal';
import ProfileForm from '@/components/edit-portfolio/ProfileForm';
import { client } from '@/lib/client';
import {
  addNewPortfolio,
  deleteNewPortfolio,
  deletePortfolio,
  loadPortfolio,
  portfolioSelector,
} from '@/store/reducers/portfolio';
import { IResponse } from '@/types/client';
import { INewPortfolio, IPortfolio } from '@/types/user';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ModalPreviewComponent = dynamic(
  () => import('@/components/edit-portfolio/PreviewModal'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const EditPortfolioPage = () => {
  const dispatch = useDispatch();
  const {
    portfolios,
    totalChanged,
    idDeletedPortfolios,
    newPortfolios,
    existingPortfolios,
  } = useSelector(portfolioSelector);

  const getInitialData = useCallback(async () => {
    const { data, error }: IResponse = await client.get({
      url: `/users/${1}/portfolios`,
    });

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

    const editedPortfolio = portfolios.filter(
      porto => existingPortfolios[porto.id].changed
    );

    axios
      .all(
        editedPortfolio.map(editedPort =>
          client.put({
            url: `/users/1/portfolios/${editedPort.id}`,
            data: editedPort,
          })
        )
      )
      .then(data => console.log(data));

    axios
      .all(newPortfolios.map(newPort => client.post({ url, data: newPort })))
      .then(data => console.log(data));

    axios
      .all(
        idDeletedPortfolios.map(id =>
          client.delete({ url: `/users/1/portfolios/${id}` })
        )
      )
      .then(data => console.log(data));
  };

  const deleteExistingPort = (id: string) => {
    dispatch(deletePortfolio(id));
  };

  const onDeletePortofolio = (ind: number) => {
    dispatch(deleteNewPortfolio(ind));
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-full md:w-[55%]">
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
                deleteHandler={() => deleteExistingPort(portfolio.id)}
              />
            ))}
          </div>
          <button
            type="button"
            name="add portfolio"
            onClick={addNewPortfolioForm}
          >
            Add portfolio
          </button>
          <div className="rounded shadow p-4">
            {newPortfolios?.map((portfolio, ind) => (
              <div key={`newPortfolio-${ind}`} className="relative px-2 pt-10">
                <button
                  type="button"
                  className="btn btn-md absolute top-0 end-0"
                  onClick={() => onDeletePortofolio(ind)}
                >
                  Remove
                </button>
                <NewPortfolioForm newPortfolio={portfolio} index={ind} />
              </div>
            ))}
            <button type="button" onClick={submitNewPortfolioData}>
              Submit All
            </button>
          </div>
        </div>
        <aside className="hidden md:block md:w-[45%]">
          <PreviewContent />
        </aside>
      </div>
      <ModalPreviewComponent />
    </>
  );
};

export default EditPortfolioPage;
