export interface SuccessResponse<T = any> {
    success:    true;
    code:       number;
    message:    string;
    data?:      T;
    timestamp:  string;
    path?:      string;
}
