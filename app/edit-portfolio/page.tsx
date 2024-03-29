'use client';

import ImageUpload from '@/components/edit-portfolio/ImageUpload';
import NewPortfolioForm from '@/components/edit-portfolio/NewPortfolioForm';
import PortfolioForm from '@/components/edit-portfolio/PortfolioForm';
import PreviewContent from '@/components/edit-portfolio/PreviewContent';
import ProfileForm from '@/components/edit-portfolio/ProfileForm';
import Card from '@/components/shared/Card';
import Skeleton from '@/components/shared/Skeleton';
import { client } from '@/lib/client';
import {
  addNewPortfolio,
  deleteNewPortfolio,
  deletePortfolio,
  portfolioSelector,
} from '@/store/reducers/portfolio';
import { profileSelector } from '@/store/reducers/profile';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    portfolios,
    totalChanged,
    idDeletedPortfolios,
    newPortfolios,
    existingPortfolios,
    isLoadingData,
  } = useSelector(portfolioSelector);

  const {
    profile: dataProfile,
    isProfileChanged,
    isLoadingData: isLoadingProfile,
  } = useSelector(profileSelector);

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

  const submitNewPortfolioData = async () => {
    setIsSubmitting(true);
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

    await axios.all(allRequest).then(data => console.log(data));

    setIsSubmitting(false);
  };

  const deleteExistingPort = (id: string) => {
    dispatch(deletePortfolio(id));
  };

  const onDeletePortofolio = (ind: number) => {
    dispatch(deleteNewPortfolio(ind));
  };

  return (
    <>
      <Head>
        <title>Edit Portfolio</title>
        <meta
          name="description"
          content="Keep your portfolio accurate and up-to-date with ease"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kakaoico.ico" />
      </Head>
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
            {!isSubmitting && (
              <button
                type="submit"
                className={`mt-5 btn btn-md ${
                  totalChanged > 0 || isProfileChanged
                    ? 'btn-primary'
                    : 'btn-disabled'
                }`}
                onClick={submitNewPortfolioData}
              >
                Simpan Perubahan
              </button>
            )}
            {isSubmitting && (
              <button type="submit" className="btn-disabled mt-5 btn btn-md">
                Submitting...
              </button>
            )}
          </div>
          {isLoadingProfile ? (
            <Skeleton customClass="h-[62px] w-[100%]" rtl={true} />
          ) : (
            <Card>
              <ImageUpload field="bgImage" />
            </Card>
          )}
          {isLoadingProfile ? (
            <Skeleton customClass="h-[62px] w-[100%]" rtl={true} />
          ) : (
            <Card>
              <ImageUpload field="profileImage" />
            </Card>
          )}

          {isLoadingProfile ? (
            <Skeleton customClass="h-[150px] w-[100%]" rtl={true} />
          ) : (
            <Card>
              <ProfileForm />
            </Card>
          )}
          {isLoadingData && (
            <Skeleton customClass="h-[150px] w-[100%]" rtl={true} />
          )}
          {!isLoadingData &&
            portfolios?.map((portfolio, ind) => (
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
          {!isLoadingData &&
            newPortfolios?.map((portfolio, ind) => (
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
