import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';
import UsernameForm from '../components/auth/UsernameForm';
import AuthButton from '../components/auth/AuthButton';
import Loader from '../components/ui/Loader';

export default function Auth(props) {
  const { user, username, loading, error } = useContext(UserContext);

  return (
    <main>
      <h1 className="mb-3">登入</h1>
      <Loader show={loading} />
      {!loading && user && !username && <UsernameForm />}
      {!loading && user && username && <AuthButton action="logout" />}
      {!loading && !user && <AuthButton action="login" />}
    </main>
  );
}
