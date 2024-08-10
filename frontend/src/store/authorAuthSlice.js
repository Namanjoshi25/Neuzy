import {createSlice} from '@reduxjs/toolkit'


const initialState={
    authorStatus: false,
    author: localStorage.getItem("authorToken") ||  null
}


const authorAuthSlice = createSlice({
    name:"authorAuth",
    initialState,
    reducers:{
      authorLogin: (state,action)=>{
    
           state.authorStatus = true,

           state.author = action.payload.author;
           
      },
      authorLogout :(state)=>{
        state.authorStatus =false;
        state.author=null
        
      },
      updateAuthor: (state, action) => {
        state.author = { ...state.author, ...action.payload };
      },
    }
});

export const{authorLogin,authorLogout,updateAuthor} = authorAuthSlice.actions
export default authorAuthSlice.reducer;
