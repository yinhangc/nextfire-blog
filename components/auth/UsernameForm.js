import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../../lib/context';
import { firestore } from '../../lib/firebase';
import debounce from 'lodash.debounce';
import UsernameMessage from './UsernameMessage';

export default function UsernameForm(props) {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);
      // Store above info at the same time in firestore
      const batch = firestore.batch();
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });
      await batch.commit();
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    if (val.length < 3) {
      setFormValue(val);
      setIsLoading(false);
      setIsValid(false);
    }
    setFormValue(val); // trigger useEffect to check username
    setIsLoading(true);
    setIsValid(false);
  };

  return (
    !username && (
      <section>
        <h3 className="mb-1">請輸入你的用戶名稱</h3>
        <form onSubmit={onSubmit} className="grid auto-rows-min gap-3">
          <input
            name="username"
            placeholder="用戶名稱"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={isLoading}
          />
          <button
            type="submit"
            className="bg-green text-white"
            disabled={!isValid}
          >
            Choose!
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {isLoading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}
