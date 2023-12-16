import { portfolioSelector } from '@/store/reducers/portfolio';
import { profileSelector } from '@/store/reducers/profile';
import { INewPortfolio, IPortfolio } from '@/types/user';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import DefaultImage from '@/app/no-image.png';
import Skeleton from '../shared/Skeleton';

const PreviewContent = () => {
  const {
    portfolios,
    newPortfolios,
    isLoadingData: isLoadingPorto,
  } = useSelector(portfolioSelector);
  const { profile: profileData, isLoadingData } = useSelector(profileSelector);

  const PortfolioItem = (porto: { data: IPortfolio | INewPortfolio }) => {
    const portofolioData = porto.data;
    return (
      <div className="rounded shadow p-4">
        <p className="font-semibold text-base sm:text-lg">
          {portofolioData.position}
        </p>
        <p className="font-semibold text-sm text-gray-600">
          {portofolioData.company}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          {portofolioData.startDate} - {portofolioData.endDate}
        </p>
        <p className="text-sm mt-2">{portofolioData.description}</p>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 pb-6 rounded-md relative shadow-sm">
      <div className="preview-image absolute left-0 end-0 top-0">
        <Image
          src={profileData.bgImage !== '' ? profileData.bgImage : DefaultImage}
          width={0}
          height={0}
          className="w-full h-[150px] md:h-[180px] rounded-t-md object-cover"
          alt="Portofolio Image Background"
        />
      </div>
      <div className="relative z-5 px-2 md:px-4">
        <div className="preview-image pt-[75px] md:pt-[90px] mb-4 flex justify-center">
          <Image
            src={
              profileData.profileImage !== ''
                ? profileData.profileImage
                : DefaultImage
            }
            width={0}
            height={0}
            className="object-cover w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full"
            alt="Portofolio Avatar Image"
          />
        </div>
        {isLoadingData ? (
          <div className="flex flex-col items-center">
            {[1, 2, 3].map(ind => (
              <Skeleton
                key={`skeletonText-${ind}`}
                customClass="h-[20px] w-[40%]"
                rtl={true}
              />
            ))}
          </div>
        ) : (
          <div className="preview-profile text-center">
            <p className="text-lg font-bold">{profileData.name}</p>
            <p className="text-md font-bold text-gray-600">
              {profileData.title}
            </p>
            <p className="text-gray-900">{profileData.description}</p>
          </div>
        )}
        <div className="preview-portfolio mt-4 flex flex-col gap-4">
          <p className="font-bold">Portofolio</p>
          {isLoadingPorto &&
            [1, 2, 3, 4].map(ind => (
              <Skeleton
                key={`skeletonText-${ind}`}
                customClass="h-[100px] w-[100%]"
                rtl={true}
              />
            ))}
          {!isLoadingPorto &&
            portfolios.map((porto, ind) => (
              <div key={`portofolio-${ind}`}>
                <PortfolioItem data={porto} />
              </div>
            ))}
          {!isLoadingPorto &&
            newPortfolios.map((porto, ind) => (
              <div key={`newPortofolio-${ind}`}>
                <PortfolioItem data={porto} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewContent;
