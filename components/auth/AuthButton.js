import { auth, googleAuthProvider } from '../../lib/firebase';
import toast from 'react-hot-toast';

export default function AuthButton({ action }) {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      toast.error('登入失敗');
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      toast.error('登出失敗');
      console.error(err);
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
