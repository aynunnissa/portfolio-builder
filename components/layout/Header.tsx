'use client';

import Image from 'next/image';
import Link from 'next/link';
import PortfolioIcon from '../../app/porticon.png';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathName = usePathname();
  return (
    <header className="header">
      <div className="flex justify-between items-center shadow px-2 sm:px-4 md:px-8 gap-2">
        <div className="header-icon flex items-center gap-2">
          <Image
            src={PortfolioIcon}
            alt="Header Icon"
            width={54}
            height={54}
            className="object-cover"
          />
          <p className="font-bold text-base md:text-2xl text-primary-main">
            MYPORTO
          </p>
        </div>
        <div className="header-links flex gap-2 sm:gap-4 md:gap-8 px-2 py-5 md:py-4 sm:px-5">
          <Link href="/">
            <p
              className={`p-2 hover:text-primary-main ${
                pathName === '/' ? 'border-b-2 border-primary-main' : ''
              }`}
            >
              Portfolio
            </p>
          </Link>
          <Link href="/edit-portfolio">
            <p
              className={`p-2 hover:text-primary-main ${
                pathName === '/edit-portfolio'
                  ? 'border-b-2 border-primary-main'
                  : ''
              }`}
            >
              Edit Portfolio
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
