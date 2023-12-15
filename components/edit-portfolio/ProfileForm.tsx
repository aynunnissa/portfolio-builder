'use client';

import useInput from '@/app/hooks/use-input';

// const notEmptyValidation = /^[a-zA-Z0-9\s]*$/;

const ProfileForm = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
  } = useInput((value: string) => value !== '');

  return (
    <div>
      <h4 className="text-bold text-underline">Profile</h4>
      <form className="profile-form mt-4">
        <div className="flex flex-col gap-y-4">
          <div className="profile-field">
            <input
              type="text"
              id="profile-name"
              className="form-input"
              onChange={nameChangedHandler}
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
              onChange={titleChangedHandler}
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
              onChange={descChangedHandler}
              onBlur={descBlurHandler}
              placeholder="Deskripsi"
              required
            >
              {enteredDesc}
            </textarea>
            {descInputHasError && (
              <p className="text-red-800">Deskripsi harus diisi</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
