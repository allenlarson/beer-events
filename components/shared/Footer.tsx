import Image from 'next/image';
import { Link } from 'next-view-transitions';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/thirstylogo.svg"
            alt="logo"
            width={128}
            height={37}
          />
        </Link>
        <p>Copyright © 2024 Thirsty Virginia. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
