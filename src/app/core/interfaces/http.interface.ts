export interface ResponseAPI{
    status: boolean,
    'status-code': number,
    data?:any,
    message?: string
}