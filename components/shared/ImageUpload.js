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
    <div
      className={`grid grid-cols-1 gap-3 items-center${
        URL && ' lg:grid-cols-[1.5fr,2fr]'
      }`}
    >
      {uploading && (
        <div className="lg:justify-self-start">
          <Loader show />
        </div>
      )}
      {uploading && (
        <h3 className="text-center font-bold lg:justify-self-end">
          {progress}%
        </h3>
      )}
      {!uploading && (
        <div className="flex flex-col gap-2">
          <label className="btn cursor-pointer w-full">
            <span className="mr-2.5">📷</span>上傳照片
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
          {URL && (
            <p className="font-bold bg-white py-3 px-8 rounded-lg flex justify-center">
              <span className="mr-2.5">💡</span>請把圖片連結貼到下方
            </p>
          )}
        </div>
      )}
      {URL && !uploading && (
        <code className="overflow-x-auto bg-white p-2 rounded-lg">{`![alt](${URL})`}</code>
      )}
    </div>
  );
}
