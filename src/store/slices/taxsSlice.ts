import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Tax, T_TaxsFilters, T_Code} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_TaxsSlice = {
    draft_tax_id: number | null,
    codes_count: number | null,
    tax: T_Tax | null,
    taxs: T_Tax[],
    filters: T_TaxsFilters,
    save_mm: boolean
}

const initialState:T_TaxsSlice = {
    draft_tax_id: null,
    codes_count: null,
    tax: null,
    taxs: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchTax = createAsyncThunk<T_Tax, string, AsyncThunkConfig>(
    "taxs/tax",
    async function(tax_id) {
        const response = await api.taxs.taxsRead(tax_id) as AxiosResponse<T_Tax>
        return response.data
    }
)

export const fetchTaxs = createAsyncThunk<T_Tax[], object, AsyncThunkConfig>(
    "taxs/taxs",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.taxs.taxsList({
            status: state.taxs.filters.status,
            date_formation_start: state.taxs.filters.date_formation_start,
            date_formation_end: state.taxs.filters.date_formation_end
        }) as AxiosResponse<T_Tax[]>
        return response.data
    }
)

export const removeCodeFromDraftTax = createAsyncThunk<T_Code[], string, AsyncThunkConfig>(
    "taxs/remove_code",
    async function(code_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.taxs.taxsDeleteCodeDelete(state.taxs.tax.id, code_id) as AxiosResponse<T_Code[]>
        return response.data
    }
)

export const deleteDraftTax = createAsyncThunk<void, object, AsyncThunkConfig>(
    "taxs/delete_draft_tax",
    async function(_, {getState}) {
        const state = getState()
        await api.taxs.taxsDeleteDelete(state.taxs.tax.id)
    }
)

export const sendDraftTax = createAsyncThunk<void, object, AsyncThunkConfig>(
    "taxs/send_draft_tax",
    async function(_, {getState}) {
        const state = getState()
        await api.taxs.taxsUpdateStatusUserUpdate(state.taxs.tax.id)
    }
)

export const updateTax = createAsyncThunk<void, object, AsyncThunkConfig>(
    "taxs/update_tax",
    async function(data, {getState}) {
        const state = getState()
        await api.taxs.taxsUpdateUpdate(state.taxs.tax.id, {
            ...data
        })
    }
)

export const updateCodeValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "taxs/update_mm_value",
    async function({code_id, paid},thunkAPI) {
        const state = thunkAPI.getState()
        await api.taxs.taxsUpdateCodeUpdate(state.taxs.tax.id, code_id, {paid})
    }
)

const taxsSlice = createSlice({
    name: 'taxs',
    initialState: initialState,
    reducers: {
        saveTax: (state, action) => {
            state.draft_tax_id = action.payload.draft_tax_id
            state.codes_count = action.payload.codes_count
        },
        removeTax: (state) => {
            state.tax = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTax.fulfilled, (state:T_TaxsSlice, action: PayloadAction<T_Tax>) => {
            state.tax = action.payload
        });
        builder.addCase(fetchTaxs.fulfilled, (state:T_TaxsSlice, action: PayloadAction<T_Tax[]>) => {
            state.taxs = action.payload
        });
        builder.addCase(removeCodeFromDraftTax.rejected, (state:T_TaxsSlice) => {
            state.tax = null
        });
        builder.addCase(removeCodeFromDraftTax.fulfilled, (state:T_TaxsSlice, action: PayloadAction<T_Code[]>) => {
            if (state.tax) {
                state.tax.codes = action.payload as T_Code[]
            }
        });
        builder.addCase(sendDraftTax.fulfilled, (state:T_TaxsSlice) => {
            state.tax = null
        });
    }
})

export const { saveTax, removeTax, triggerUpdateMM, updateFilters } = taxsSlice.actions;

export default taxsSlice.reducer