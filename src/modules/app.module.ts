import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Dispatch } from '@utils/store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface IReferral {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  addressline1: string;
  addressline2?: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
};

interface IAppState {
  referrals: IReferral[];
  countPerPage: number;
  currentPage: number;
  total: number;
}

const initialState: IAppState = {
  referrals: [],
  countPerPage: 0,
  currentPage: 1,
  total: 0,
};

async function sendRequest(input: RequestInfo, init?: RequestInit | undefined) {
  const response = await fetch(input, init);
  if (response.ok) {
      return response;
  } else {
      const errorBody = await response.json();
      throw new Error(errorBody.error);
  }
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    saveReferrals: (
      state: IAppState,
      { payload }: PayloadAction<{ referrals: IReferral[], countPerPage: number, currentPage: number, total: number }>,
    ) => {
      state.referrals = payload.referrals;
      state.countPerPage = payload.countPerPage;
      state.currentPage = payload.currentPage;
      state.total = payload.total;
    },
    reset: () => initialState,
  },
});

const asyncActions = {
  fetchReferrals: (page: number = 1) => async (dispatch: Dispatch) => {
    try {
      const response = await sendRequest(`${API_URL}/referrals?page=` + page);
      const resolvedRes = await response.json();
  
      dispatch(
        slice.actions.saveReferrals({
          referrals: resolvedRes.items,
          countPerPage: resolvedRes.countPerPage,
          currentPage: resolvedRes.currentPage,
          total: resolvedRes.total,
        }),
      );
    } catch (err) {
      console.error('[##] err', err);
    }
  },
};

export function useAppModule() {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector(({ app }: State) => app);
  return { dispatch, ...state, ...slice.actions, ...asyncActions };
}

export default slice.reducer;
