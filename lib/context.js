import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const UserContext = createContext({
  user: null,
  username: null,
  loading: false,
  error: null,
});

export function useUserData() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubcribe;
    if (user) {
      console.log(user);
      const ref = firestore.collection('users').doc(user.uid);
      unsubcribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubcribe;
  }, [user]);

  return { user, username, loading, error };
}
