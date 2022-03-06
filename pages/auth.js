import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import UsernameForm from '../components/auth/UsernameForm';
import AuthButton from '../components/auth/AuthButton';
import Loader from '../components/ui/Loader';
import toast from 'react-hot-toast';

export default function Auth(props) {
  const { user, username, loading, error } = useContext(UserContext);

  const anonymousSignIn = async () => {
    try {
      await auth.signInAnonymously();
    } catch (err) {
      toast.error('登入失敗');
    }
  };

  return (
    <main className="grid gap-4">
      {!user && <h1 className="mb-3">登入</h1>}
      <Loader show={loading} />
      {!loading && user && !username && <UsernameForm />}
      {!loading && user && username && <AuthButton action="logout" />}
      {!loading && !user && <AuthButton action="login" />}
      {!loading && !user && (
        <button onClick={anonymousSignIn} className="w-full">
          匿名登入
        </button>
      )}
    </main>
  );
}
