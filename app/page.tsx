'use client';

import { client } from '@/lib/client';
import { IResponse } from '@/types/client';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [profile, setProfile] = useState({});

  const fetchInitialProfile = useCallback(async () => {
    const { data, error }: IResponse = await client.get({ url: '/users' });
    if (data) {
      setProfile(data[0]);
    }
  }, []);

  useEffect(() => {
    fetchInitialProfile();
  }, [fetchInitialProfile]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
