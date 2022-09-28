import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <nav>
        <Link href={'/login'}>Login</Link>
      </nav>
    </header>
  );
};
