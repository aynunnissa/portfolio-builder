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

      return {
        ...state,
        ...profile,
      };
    },
    updateProfile: (state, action: PayloadAction<IProfileState>) => {
      const updatedProfile: IProfileState = action.payload;

      return {
        ...state,
        ...updatedProfile,
      };
    },
  },
});

export const { loadProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;

export const profileSelector = (state: { profileStore: IProfileState }) =>
  state.profileStore;
