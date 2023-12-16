'use client';

import { client } from '@/lib/client';
import { IResponse } from '@/types/client';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import useInput from '@/hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadProfile,
  profileSelector,
  updateProfile,
} from '@/store/reducers/profile';

// const notEmptyValidation = /^[a-zA-Z0-9\s]*$/;

const ProfileForm = () => {
  const isInitialLoad = useRef(true);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profile = useSelector(profileSelector);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    defaultValueHandler: setDefaultName,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    defaultValueHandler: setDefaultTitle,
    inputBlurHandler: titleBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangedHandler,
    defaultValueHandler: setDefaultDesc,
    inputBlurHandler: descBlurHandler,
  } = useInput((value: string) => value !== '');

  // const updateProfileData = async (event: MouseEvent<HTMLButtonElemen>) => {
  //   event.preventDefault();
  //   if (!userId) {
  //     console.log('User not found');
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   const { data, error }: IResponse = await client.put({
  //     url: `/users/${userId}`,
  //     data: {
  //       name: enteredName,
  //       title: enteredTitle,
  //       description: enteredDesc,
  //     },
  //   });

  //   setIsSubmitting(false);

  //   if (data) {
  //     setDefaultName(data.name);
  //     setDefaultTitle(data.title);
  //     setDefaultDesc(data.description);
  //   }
  // };

  const fetchInitialProfile = useCallback(async () => {
    if (isInitialLoad.current) {
      const { data, error }: IResponse = await client.get({ url: '/users' });
      if (data) {
        const profileData = data[0];
        setUserId(profileData.id);
        setDefaultName(profileData.name);
        setDefaultTitle(profileData.title);
        setDefaultDesc(profileData.description);

        dispatch(loadProfile(profileData));
      }
      isInitialLoad.current = false;
    }
  }, [setDefaultName, setDefaultTitle, setDefaultDesc, dispatch]);

  useEffect(() => {
    fetchInitialProfile();
  }, [fetchInitialProfile]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: 'name' | 'title' | 'description'
  ) => {
    const newObj = { ...profile };
    newObj[field] = event.target.value;
    dispatch(updateProfile(newObj));
  };

  return (
    <div>
      <h4 className="text-bold text-underline">Profile</h4>
      <div className="flex flex-col gap-y-4">
        <div className="profile-field">
          <input
            type="text"
            id="profile-name"
            className="form-input"
            onChange={e => {
              handleChange(e, 'name');
              nameChangedHandler(e);
            }}
            onBlur={nameBlurHandler}
            value={enteredName}
            placeholder="Nama"
            required
          />
          {nameInputHasError && (
            <p className="text-red-800">Nama harus diisi</p>
          )}
        </div>
        <div className="profile-field">
          <input
            type="text"
            id="profile-title"
            className="form-input"
            onChange={e => {
              handleChange(e, 'title');
              titleChangedHandler(e);
            }}
            onBlur={titleBlurHandler}
            value={enteredTitle}
            placeholder="Title/Posisi"
            required
          />
          {titleInputHasError && (
            <p className="text-red-800">Title harus diisi</p>
          )}
        </div>
        <div className="profile-field">
          <textarea
            id="profile-desc"
            className="form-input"
            onChange={e => {
              handleChange(e, 'description');
              descChangedHandler(e);
            }}
            onBlur={descBlurHandler}
            placeholder="Deskripsi"
            value={enteredDesc}
            rows={4}
            required
          ></textarea>
          {descInputHasError && (
            <p className="text-red-800">Deskripsi harus diisi</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
