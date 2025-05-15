export interface ErrorResponse {
    success:        false;
    code:           number;
    message:        string;
    errorDetails?:  any
    timestamp:      string;
    path?:          string;
}
