'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { client } from '@/lib/client';
import { IResponse } from '@/types/client';
import { loadPortfolio } from '@/store/reducers/portfolio';
import { loadProfile } from '@/store/reducers/profile';

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const getInitialData = useCallback(async () => {
    const { data, error }: IResponse = await client.get({
      url: `/users/${1}/portfolios`,
    });

    if (data) {
      // setPortfolios(data);
      dispatch(loadPortfolio(data));
    }
  }, [dispatch]);

  const fetchInitialProfile = useCallback(async () => {
    const { data, error }: IResponse = await client.get({ url: '/users' });
    if (data) {
      const profileData = data[0];
      dispatch(loadProfile(profileData));
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialData();
    fetchInitialProfile();
  }, [getInitialData, fetchInitialProfile]);

  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-surface-gray">
      <Header />
      <main className="px-4 sm:px-8 md:px-12 lg:px-20 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
