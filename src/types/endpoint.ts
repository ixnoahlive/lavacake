export interface Endpoint {
    endpoint: string,
    params: Array<string>
    run(Request, URLSearchParams),
}