export interface User {
    //*Added Section - Start*
    id: number;
    name: string;
    email: string;
    password: string;
    access_token: string;
    expires_in: number;
    //**Added Section - End */
}
