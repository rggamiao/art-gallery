import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  apiData: null,
  objectId: 1
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { getState }) => {
    const state = getState();
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`);
    const data = await response.json();
    return data;
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.apiData = action.payload;
    },
    clearData: (state) => {
      state.apiData = null;
    },
    inputId: (state, action) => {
      state.objectId = action.payload;
    },
    incrementId: (state) => {
      state.objectId += 1;
    },
    decrementId: (state) => {
      state.objectId = Math.max(1, state.objectId - 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.apiData = action.payload;
      });
  }
});

export const { setData, clearData, incrementId, decrementId, inputId } = dataSlice.actions;

export default dataSlice.reducer;