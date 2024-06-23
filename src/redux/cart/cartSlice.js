import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cartCount',
    initialState:{
        count:0
    },
    reducers:{
        AssignCount:(state,action)=>{
            state.count=action.payload;
        },
        IncreaseCount:(state,action)=>{
            state.count+=action.payload;
        },
        DecreaseCount:(state,action)=>{
            state.count-=action.payload;
        }
    }
})

export default cartSlice.reducer;

export const {AssignCount,IncreaseCount,DecreaseCount}=cartSlice.actions;