import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ width = 120, height = 60 }) => {
  return (
    <div className="cursor-pointer">
      <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={width}
            height={height}
            className="inline-block"
          />
      </Link>
    </div>
  );
};

export const TextLogo: React.FC<LogoProps> = ({ width = 240, height = 120 }) => {
    return (
      <div className="cursor-pointer">
        <Link href="/">
            <Image
              src="/images/text-logo.png"
              alt="Logo"
              width={width}
              height={height}
              className="inline-block"
            />
        </Link>
      </div>
    );
  };

