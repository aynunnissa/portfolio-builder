import { convertImageToBase64 } from '@/lib/helper';
import { profileSelector, updateProfile } from '@/store/reducers/profile';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ImageUpload = ({ field }: { field: 'bgImage' | 'profileImage' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        const newObj = { ...profile };
        newObj[field] = base64;
        dispatch(updateProfile(newObj));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </form>

      {/* {base64String && (
        <div>
          <h2>Base64 String:</h2>
          <textarea readOnly rows={5} value={base64String}></textarea>
        </div>
      )} */}
    </div>
  );
};

export default ImageUpload;
