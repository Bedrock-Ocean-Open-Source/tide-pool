import { configureStore } from '@reduxjs/toolkit';
import { SurveysSliceState } from './pages/Surveys/types';
import { surveysSlice } from '@/pages/Surveys/surveysSlice';


export type RootState = {
  surveys: SurveysSliceState;
};

export type AppDispatch = typeof store.dispatch


export const store = configureStore<RootState>({
  reducer: {
    surveys: surveysSlice.reducer,
  },
});
