import { convertImageToBase64 } from '@/lib/helper';
import {
  profileSelector,
  updateBGImage,
  updateProfile,
  updateProfileImage,
} from '@/store/reducers/profile';
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
        if (field === 'bgImage') dispatch(updateBGImage(base64));
        else if (field === 'profileImage') dispatch(updateProfileImage(base64));
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
