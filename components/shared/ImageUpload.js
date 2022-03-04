import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '../../lib/firebase';
import Loader from '../ui/Loader';

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgressing] = useState(0);
  const [URL, setURL] = useState(null);

  const uploadFile = async (e) => {
    const file = Array.from(e.target.files)[0];
    console.log(file);
    console.log(file.type);
    const extension = file.type.split('/')[1];
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);
    const task = ref.put(file);
    task.on(STATE_CHANGED, (snapshot) => {
      const percent = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgressing(percent);
      // Not native promise
      task
        .then((url) => ref.getDownloadURL())
        .then((url) => {
          setURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}
      {!uploading && (
        <>
          <label className="btn">
            📷 上傳照片
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
      {URL && <code>{`![alt](${URL})`}</code>}
    </div>
  );
}
