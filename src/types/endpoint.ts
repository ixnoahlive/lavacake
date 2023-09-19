export interface Endpoint {
    endpoint: string,
    params: Array<string>,
    path: string,
    run(req: Request, params: URLSearchParams): any,
}
