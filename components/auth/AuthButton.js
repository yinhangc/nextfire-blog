import { auth, googleAuthProvider } from '../../lib/firebase';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function AuthButton({ action }) {
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
      router.push('/admin');
    } catch (err) {
      toast.error('登入失敗');
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      toast.error('登出失敗');
    }
  };

  return (
    <>
      {action === 'login' ? (
        <button
          className="bg-white text-black tracking-wider"
          onClick={signInWithGoogle}
        >
          <img src="/google.png" className="w-8 mr-2" />
          以Google登入
        </button>
      ) : (
        <button className="btn-google" onClick={signOut}>
          登出
        </button>
      )}
    </>
  );
}
