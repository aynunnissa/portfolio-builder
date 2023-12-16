import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IProfileState {
  name: string;
  title: string;
  description: string;
  bgImage: string;
  profileImage: string;
}

const initialState: IProfileState = {
  name: '',
  title: '',
  description: '',
  bgImage: '',
  profileImage: '',
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
        ...profile,
        bgImage,
        profileImage,
      };
    },
    updateProfile: (state, action: PayloadAction<IProfileState>) => {
      const updatedProfile: IProfileState = action.payload;

      return {
        ...state,
        ...updatedProfile,
      };
    },
    updateBGImage: (state, action: PayloadAction<string>) => {
      const bgImage = action.payload;
      localStorage.setItem('bgImage', bgImage);

      return {
        ...state,
        bgImage,
      };
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      const profileImage = action.payload;
      localStorage.setItem('profileImage', profileImage);

      return {
        ...state,
        profileImage,
      };
    },
  },
});

export const { loadProfile, updateProfile, updateBGImage, updateProfileImage } =
  profileSlice.actions;

export default profileSlice.reducer;

export const profileSelector = (state: { profileStore: IProfileState }) =>
  state.profileStore;
