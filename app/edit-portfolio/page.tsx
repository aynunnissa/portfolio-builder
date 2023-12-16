'use client';

import ImageUpload from '@/components/edit-portfolio/ImageUpload';
import NewPortfolioForm from '@/components/edit-portfolio/NewPortfolioForm';
import PortfolioForm from '@/components/edit-portfolio/PortfolioForm';
import PreviewContent from '@/components/edit-portfolio/PreviewContent';
import ProfileForm from '@/components/edit-portfolio/ProfileForm';
import Card from '@/components/shared/Card';
import { client } from '@/lib/client';
import {
  addNewPortfolio,
  deleteNewPortfolio,
  deletePortfolio,
  loadPortfolio,
  portfolioSelector,
} from '@/store/reducers/portfolio';
import { profileSelector } from '@/store/reducers/profile';
import { IResponse } from '@/types/client';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useCallback, useEffect } from 'react';
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

  const dataProfile = useSelector(profileSelector);

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

    const updatePortfolioRequests = [
      ...editedPortfolio.map(editedPort =>
        client.put({
          url: `/users/1/portfolios/${editedPort.id}`,
          data: editedPort,
        })
      ),
    ];

    const updateProfileRequest = client.put({
      url: '/users/1',
      data: {
        name: dataProfile.name,
        title: dataProfile.title,
        description: dataProfile.description,
      },
    });

    const newPortfolioRequests = [
      ...newPortfolios.map(newPort => client.post({ url, data: newPort })),
    ];

    const deletePortfolioRequests = [
      ...idDeletedPortfolios.map(id =>
        client.delete({ url: `/users/1/portfolios/${id}` })
      ),
    ];
    const allRequest = [
      ...updatePortfolioRequests,
      updateProfileRequest,
      ...newPortfolioRequests,
      ...deletePortfolioRequests,
    ];

    axios.all(allRequest).then(data => console.log(data));
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
          <div className="flex gap-4">
            <button
              type="button"
              name="add portfolio"
              onClick={addNewPortfolioForm}
              className={`mt-5 btn btn-md ${
                portfolios.length + newPortfolios.length === 10
                  ? 'btn-disabled'
                  : 'btn-primary'
              }`}
            >
              + Add portfolio
            </button>
            <button
              type="submit"
              className={`mt-5 btn btn-md ${
                totalChanged > 0 ? 'btn-primary' : 'btn-disabled'
              }`}
              onClick={submitNewPortfolioData}
            >
              Simpan Perubahan
            </button>
          </div>
          <Card>
            <ImageUpload field="bgImage" />
          </Card>
          <Card>
            <ImageUpload field="profileImage" />
          </Card>
          <Card>
            <ProfileForm />
          </Card>
          {portfolios?.map((portfolio, ind) => (
            <Card key={`portfolio-${portfolio.id}`}>
              <div className="relative px-2 pt-4">
                <button
                  type="button"
                  className="btn btn-md absolute top-0 end-0"
                  onClick={() => deleteExistingPort(portfolio.id)}
                >
                  Remove
                </button>
                <h4 className="font-bold text-sm underline mb-6">
                  Portfolio {ind + 1}
                </h4>
                <PortfolioForm portfolio={portfolio} />
              </div>
            </Card>
          ))}
          {newPortfolios?.map((portfolio, ind) => (
            <Card key={`newPortfolio-${ind}`}>
              <div className="relative px-2 pt-4">
                <button
                  type="button"
                  className="btn btn-md absolute top-0 end-0"
                  onClick={() => onDeletePortofolio(ind)}
                >
                  Remove
                </button>
                <h4 className="font-bold text-sm underline mb-6">
                  Portfolio {portfolios.length + ind + 1}
                </h4>
                <NewPortfolioForm newPortfolio={portfolio} index={ind} />
              </div>
            </Card>
          ))}
        </div>
        <aside className="hidden md:block md:w-[45%] bg-white h-fit">
          <PreviewContent />
        </aside>
      </div>
      <ModalPreviewComponent />
    </>
  );
};

export default EditPortfolioPage;
