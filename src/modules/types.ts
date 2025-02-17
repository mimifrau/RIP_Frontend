export type T_Code = {
    id: string
    name: string
    description: string
    decryption: number
    image: string
    status: number
    paid?: string
}

export type T_Tax = {
    id: string | null
    status: E_TaxStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    codes: T_Code[]
    name: string
    summ: number
    qr: string
}

export enum E_TaxStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_TaxsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_TaxStatus
    owner: string
}

export type T_CodesListResponse = {
    codes: T_Code[],
    draft_tax_id?: number,
    codes_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_CodeAddData = {
    name: string;
    description: string;
    decryption: number;
    image?: File | null;
}