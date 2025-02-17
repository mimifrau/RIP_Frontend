import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Code, T_CodeAddData, T_CodesListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveTax} from "store/slices/taxsSlice.ts";
import {Code} from "src/api/Api.ts";

type T_CodesSlice = {
    code_name: string
    code: null | T_Code
    codes: T_Code[]
}

const initialState:T_CodesSlice = {
    code_name: "",
    code: null,
    codes: []
}

export const fetchCode = createAsyncThunk<T_Code, string, AsyncThunkConfig>(
    "fetch_code",
    async function(id) {
        const response = await api.codes.codesRead(id) as AxiosResponse<T_Code>
        return response.data
    }
)

export const fetchCodes = createAsyncThunk<T_Code[], object, AsyncThunkConfig>(
    "fetch_codes",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.codes.codesList({
            code_name: state.codes.code_name
        }) as AxiosResponse<T_CodesListResponse>

        thunkAPI.dispatch(saveTax({
            draft_tax_id: response.data.draft_tax_id,
            codes_count: response.data.codes_count
        }))

        return response.data.codes
    }
)

export const addCodeToTax = createAsyncThunk<void, string, AsyncThunkConfig>(
    "codes/add_code_to_tax",
    async function(code_id) {
        await api.codes.codesAddToTaxCreate(code_id)
    }
)

export const deleteCode = createAsyncThunk<T_Code[], string, AsyncThunkConfig>(
    "delete_code",
    async function(code_id) {
        const response = await api.codes.codesDeleteDelete(code_id) as AxiosResponse<T_Code[]>
        return response.data
    }
)

export const updateCode = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_code",
    async function({code_id, data}) {
        await api.codes.codesUpdateUpdate(code_id as string, data as Code)
    }
)

export const updateCodeImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_code_image",
    async function({code_id, data}) {
        await api.codes.codesUpdateImageCreate(code_id as string, data as {image?: File})
    }
)

export const createCode = createAsyncThunk<void, T_CodeAddData, AsyncThunkConfig>(
    "update_code",
    async function(data) {
        await api.codes.codesCreateCreate(data)
    }
)

const codesSlice = createSlice({
    name: 'codes',
    initialState: initialState,
    reducers: {
        updateCodeName: (state, action) => {
            state.code_name = action.payload
        },
        removeSelectedCode: (state) => {
            state.code = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCodes.fulfilled, (state:T_CodesSlice, action: PayloadAction<T_Code[]>) => {
            state.codes = action.payload
        });
        builder.addCase(fetchCode.fulfilled, (state:T_CodesSlice, action: PayloadAction<T_Code>) => {
            state.code = action.payload
        });
        builder.addCase(deleteCode.fulfilled, (state:T_CodesSlice, action: PayloadAction<T_Code[]>) => {
            state.codes = action.payload
        });
    }
})

export const { updateCodeName, removeSelectedCode} = codesSlice.actions;

export default codesSlice.reducer