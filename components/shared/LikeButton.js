import { firestore, auth, increment } from '../../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function LikeButton({ postRef }) {
  const heartRef = postRef.collection('likes').doc(auth.currentUser?.uid);
  const [heartDoc] = useDocument(heartRef);

  const addLike = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();
    batch.update(postRef, { likeCount: increment(1) });
    batch.set(heartRef, { uid });
    await batch.commit();
  };

  const removeLike = async () => {
    const batch = firestore.batch();
    batch.update(postRef, { likeCount: increment(-1) });
    batch.delete(heartRef);
    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <button onClick={removeLike}>
      <span className="mr-2.5">💔</span>Unlike
    </button>
  ) : (
    <button onClick={addLike}>
      <span className="mr-2.5">❤️</span>Like
    </button>
  );
}
