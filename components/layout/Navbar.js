import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Navbar({}) {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="fixed top-0 px-[10%] h-[70px] w-full bg-white z-40 border-b-[1px] border-gray shadow-sm">
      <ul className="flex items-center justify-between h-full">
        <li>
          <Link href="/">
            <button className="text-white px-4 py-2 bg-black">BLOG</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="ml-auto mr-3">
              <Link href="/admin">
                <button className="bg-blue text-white">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img
                  src={user?.photoURL}
                  className="w-12 h-12 rounded-full cursor-pointer"
                />
              </Link>
            </li>
          </>
        )}
        {!username && (
          <>
            <li>
              <Link href="/auth">
                <button className="text-white bg-blue">登入</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
