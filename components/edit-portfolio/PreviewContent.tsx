import { portfolioSelector } from '@/store/reducers/portfolio';
import { INewPortfolio, IPortfolio } from '@/types/user';
import { useSelector } from 'react-redux';

const PreviewContent = () => {
  const { portfolios, newPortfolios } = useSelector(portfolioSelector);

  const PortfolioItem = (porto: { data: IPortfolio | INewPortfolio }) => {
    const portofolioData = porto.data;
    return (
      <div className="rounded shadow p-4">
        <p className="font-semibold text-md">{portofolioData.position}</p>
        <p className="font-semibold text-gray-600">{portofolioData.company}</p>
        <p className="text-gray-600">
          {portofolioData.startDate} - {portofolioData.endDate}
        </p>
        <p>{portofolioData.description}</p>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="preview-profile text-center">
        <p className="text-lg font-bold">Nama</p>
        <p className="text-md font-bold text-gray-600">Title</p>
        <p className="text-gray-900">Hello, its me!</p>
      </div>
      <div className="preview-portfolio flex flex-col gap-3">
        <p className="font-bold">Portofolio</p>
        {portfolios.map((porto, ind) => (
          <div key={`portofolio-${ind}`}>
            <PortfolioItem data={porto} />
          </div>
        ))}
        {newPortfolios.map((porto, ind) => (
          <div key={`newPortofolio-${ind}`}>
            <PortfolioItem data={porto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewContent;
