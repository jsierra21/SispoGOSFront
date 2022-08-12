export interface User {
    user: string,
    "first-name": string,
    "last-name"?: string,
    "technician": any,
    "operating-units"?: any
}

export interface ResponseOAUTH{
    access_token: string,
    token_type: string,
    expires_in: string
}