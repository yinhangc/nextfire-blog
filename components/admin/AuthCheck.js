import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

// Only render if logged in
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  return username
    ? props.children
    : props.fallback || (
        <button className="bg-blue text-white">
          <Link href="/auth">請先登入 🔐</Link>
        </button>
      );
}
