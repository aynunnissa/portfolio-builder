const PreviewContent = () => {
  const PortfolioItem = () => {
    return (
      <div className="rounded shadow p-4">
        <p className="font-semibold text-md">Front End Developer</p>
        <p className="font-semibold text-gray-600">MySkill</p>
        <p className="text-gray-600">Januari 2023 - Desember 2023</p>
        <p>Deskripsi abcdefgh</p>
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
        <PortfolioItem />
        <PortfolioItem />
        <PortfolioItem />
        <PortfolioItem />
        <PortfolioItem />
      </div>
    </div>
  );
};

export default PreviewContent;
