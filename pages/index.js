import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Loader from '../components/ui/Loader';
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <div>
      <Loader show />
      <button onClick={() => toast.error('Unable to fetch data!')}>
        Toast Me!
      </button>
      <Link
        prefetch={true}
        href={{
          pathname: '/[username]',
          query: { username: 'jeff123' },
        }}
      >
        <a>Jeff's profile</a>
      </Link>
    </div>
  );
}
