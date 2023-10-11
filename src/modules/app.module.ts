import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Dispatch } from '@utils/store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface IReferralPayload {
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

interface IReferral extends IReferralPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

interface IAppState {
  referrals: IReferral[];
  countPerPage: number;
  currentPage: number;
  total: number;
  createStatus: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: IAppState = {
  referrals: [],
  countPerPage: 0,
  currentPage: 1,
  total: 0,
  createStatus: 'idle',
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
    setCreateStatus: (state: IAppState, { payload }: PayloadAction<'idle' | 'loading' | 'success' | 'error'>) => {
      state.createStatus = payload;
    },
    reset: () => initialState,
  },
});

const asyncActions = {
  fetchReferrals: (page: number = 1, search: string = '') => async (dispatch: Dispatch) => {
    try {
      const response = await sendRequest(`${API_URL}/referrals?page=` + page + '&search=' + search);
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
  createReferral: (referral: IReferralPayload) => async (dispatch: Dispatch) => {
    try {
      const response = await sendRequest(`${API_URL}/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(referral),
      });

      const resolvedRes = await response.json();
  
      if (resolvedRes) {
        dispatch(slice.actions.setCreateStatus('success'));
      }
    } catch (err) {
      console.error('[##] err', err);
    }
  }
};

export function useAppModule() {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector(({ app }: State) => app);
  return { dispatch, ...state, ...slice.actions, ...asyncActions };
}

export default slice.reducer;
