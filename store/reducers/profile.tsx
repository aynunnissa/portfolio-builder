import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

interface IProfileState {
  name: string;
  title: string;
  description: string;
  bgImage: string;
  profileImage: string;
}

interface IState {
  existingProfile: IProfileState;
  profile: IProfileState;
  isProfileChanged: boolean;
  isLoadingData: boolean;
}

const initialState: IState = {
  existingProfile: {
    name: '',
    title: '',
    description: '',
    bgImage: '',
    profileImage: '',
  },
  profile: {
    name: '',
    title: '',
    description: '',
    bgImage: '',
    profileImage: '',
  },
  isProfileChanged: false,
  isLoadingData: true,
};

const profileWasChanged = (
  updatedProfile: IProfileState,
  currentProfile: IProfileState
) => {
  return (
    updatedProfile.name !== currentProfile.name ||
    updatedProfile.title !== currentProfile.title ||
    updatedProfile.description !== currentProfile.description ||
    updatedProfile.bgImage !== currentProfile.bgImage ||
    updatedProfile.profileImage !== currentProfile.profileImage
  );
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadProfile: (state, action: PayloadAction<IProfileState>) => {
      const profile: IProfileState = action.payload;
      const bgImage = localStorage.getItem('bgImage') ?? '';
      const profileImage = localStorage.getItem('profileImage') ?? '';
      return {
        ...state,
        existingProfile: { ...profile, bgImage, profileImage },
        profile: { ...profile, bgImage, profileImage },
        isLoadingData: false,
      };
    },
    updateProfile: (state, action: PayloadAction<IProfileState>) => {
      const updatedProfile: IProfileState = {
        ...state.profile,
        ...action.payload,
      };
      const currentProfile = { ...state.existingProfile };
      const profileChanged = profileWasChanged(updatedProfile, currentProfile);

      return {
        ...state,
        isProfileChanged: profileChanged,
        profile: updatedProfile,
      };
    },
    updateBGImage: (state, action: PayloadAction<string>) => {
      const bgImage = action.payload;
      localStorage.setItem('bgImage', bgImage);

      const profileChanged = bgImage !== state.existingProfile.bgImage;

      return {
        ...state,
        profile: { ...state.profile, bgImage },
        isProfileChanged: profileChanged,
      };
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      const profileImage = action.payload;
      localStorage.setItem('profileImage', profileImage);

      const profileChanged =
        profileImage !== state.existingProfile.profileImage;

      return {
        ...state,
        profile: { ...state.profile, profileImage },
        isProfileChanged: profileChanged,
      };
    },
  },
});

export const { loadProfile, updateProfile, updateBGImage, updateProfileImage } =
  profileSlice.actions;

export default profileSlice.reducer;

export const profileSelector = (state: { profileStore: IState }) =>
  state.profileStore;
