import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_User} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";

const initialState:T_usersSlice = {
    users: [],
}

type T_usersSlice = {
    users: T_User[]
}

export const fetchUsers  = createAsyncThunk<T_User[], object, AsyncThunkConfig>(
    "fetch_users",
    async function() {
        const response = await api.users.usersSearchList() as AxiosResponse<T_User[]>

        return response.data
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state:T_usersSlice, action: PayloadAction<T_User[]>) => {
            state.users = action.payload
        });
    }
})

export default usersSlice.reducer