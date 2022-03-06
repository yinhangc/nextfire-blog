import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import AuthButton from '../auth/AuthButton';

export default function Navbar({}) {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="fixed top-0 px-[10%] h-[70px] w-full bg-white z-40 border-b-[1px] border-gray shadow-sm">
      <ul className="flex items-center justify-between h-full">
        <li>
          <Link href="/">
            <button className="text-white px-5 py-2 bg-black">
              <span className="mr-2.5 pb-[1px]">🏠</span>主頁
            </button>
          </Link>
        </li>
        {username && (
          <div className="flex gap-3">
            <li>
              <Link href="/admin">
                <button className="bg-blue text-white">
                  <span className="mr-2.5">✏️</span>寫帖子
                </button>
              </Link>
            </li>
            <li>
              <AuthButton action="logout" />
            </li>
            <li>
              <Link href={`/${username}`}>
                <img
                  src={user?.photoURL || '/icon.png'}
                  className="w-12 h-12 rounded-full cursor-pointer"
                />
              </Link>
            </li>
          </div>
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
