export interface IClient {
    url: string,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    data?: object,
    params?: object
}

export interface IProps {
    url: string,
    data?: object,
    params?: object
}

export interface IResponse {
    data?: any,
    status?: number,
    error?: string
}