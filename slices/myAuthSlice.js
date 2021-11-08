import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import showSnackBar from "../utils/snackbar";
import axios from "axios";
export const signUpRequest = createAsyncThunk(
  "myAuth/signUpRequest",
  async (params) => {
    try {

      const url = 'http://29c3-2402-800-61a6-af36-aaaf-e507-8d4-531.ngrok.io/api/v1/users/register';

      await axios({
        method: 'post',
        url: url,
        data: {
          phonenumber : params.phonenumber,
          password: params.password,
          username: params.username
        }
      })
        .then(function (response) {
          console.log('success')
          return {
            user: response.data,
          };
        })
        .catch(function (error) {
          console.log("Error at signUpRequest:", error.message);

          // showSnackBar(error.message);
    
          return false;
        });

      // await userCredential.user.updateProfile({ displayName: params.name });

      // await auth().currentUser.reload();

      // return {
      //   user: auth().currentUser,
      // };
    } catch (error) {
      console.log("Error at signUpRequest:", error.message);

      // showSnackBar(error.message);

      return false;
    }
  }
);

export const signInRequest = createAsyncThunk(
  "myAuth/signInRequest",
  async (params) => {
    try {
      const url = 'http://29c3-2402-800-61a6-af36-aaaf-e507-8d4-531.ngrok.io/api/v1/users/login';

      await axios({
        method: 'post',
        url: url,
        data: {
          phoneNumber : params.phoneNumber,
          password: params.password
        }
      })
        .then(function (response) {
          return true;
        })
        .catch(function (error) {
          console.log("Error at signInRequest:", error.message);

          // showSnackBar(error.message);
    
          return false;
        });

    } catch (error) {
      console.log("Error at signInRequest:", error.message);

      // showSnackBar(error.message);

      return false;
    }
  }
);

// export const updateAvatarRequest = createAsyncThunk(
//   "myauth/updateAvatarRequest",
//   async (params) => {
//     try {
//       await auth().currentUser.updateProfile({ photoURL: params.url });

//       await auth().currentUser.reload();

//       return {
//         user: auth().currentUser,
//       };
//     } catch (error) {
//       console.log("Error at updateAvatarRequest:", error.message);

//       return false;
//     }
//   }
// );

// export const signOutRequest = createAsyncThunk(
//   "myauth/signOutRequest",
//   async (params) => {
//     try {
//       await auth().signOut();
//     } catch (error) {
//       console.log("Error at signOutRequest:", error.message);
//     }
//   }
// );

const myAuth = createSlice({
  name: "myAuth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: {
    [signUpRequest.pending]: () => { },
    [signUpRequest.rejected]: () => { },
    [signUpRequest.fulfilled]: (state, action) => {
      if (action.payload) {
        // showSnackBar("Đăng ký thành công!");

        state.user = action.payload.user;

        // firestore().collection("Users").doc(action.payload.user.uid).set({
        //   id: action.payload.user.uid,
        //   email: action.payload.user.email,
        //   name: action.payload.user.displayName,
        //   avatar: action.payload.user.photoURL,
        // });
      }
    },

    [signInRequest.pending]: () => { },
    [signInRequest.rejected]: () => { },
    [signInRequest.fulfilled]: (state, action) => {
      if (action.payload) {
        // showSnackBar("Đăng nhập thành công!");
      }
    },

    // [updateAvatarRequest.pending]: () => { },
    // [updateAvatarRequest.rejected]: () => { },
    // [updateAvatarRequest.fulfilled]: (state, action) => {
    //   if (action.payload) {
    //     showSnackBar("Cập nhật ảnh đại diện thành công!");

    //     state.user = action.payload.user;

    //     firestore().collection("Users").doc(action.payload.user.uid).update({
    //       avatar: action.payload.user.photoURL,
    //     });
    //   }
    // },
  },
});

const { reducer, actions } = myAuth;

export const { setUser } = actions;
export default reducer;
