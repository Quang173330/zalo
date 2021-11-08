// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';

// export const searchRequest = createAsyncThunk(
//   'search/searchRequest',
//   async (params, thunkAPI) => {
//     try {
//       if (!params.keyword) {
//         return [];
//       }

//       const querySnapshot = await firestore()
//         .collection('Users')
//         .where('name', '>=', params.keyword)
//         .where('name', '<', `${params.keyword}z`)
//         .where('name', '!=', thunkAPI.getState().myauth.user.displayName)
//         .get();

//       let result = [];

//       querySnapshot.forEach(documentSnapshot => {
//         result.push(documentSnapshot.data());
//       });

//       return result;
//     } catch (error) {
//       console.log('Error at searchRequest:', error.message);
//     }
//   },
// );

// const search = createSlice({
//   name: 'search',
//   initialState: {
//     users: [],
//   },
//   reducers: {},
//   extraReducers: {
//     [searchRequest.pending]: () => {},
//     [searchRequest.rejected]: () => {},
//     [searchRequest.fulfilled]: (state, action) => {
//       state.users = action.payload;
//     },
//   },
// });

// const {reducer, actions} = search;

// export const {} = actions;
// export default reducer;
