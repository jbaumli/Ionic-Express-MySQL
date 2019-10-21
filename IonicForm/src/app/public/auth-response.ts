export interface AuthResponse {
    //**Added Section - Start */
    user: {
        id: number,
        name: string,
        email: string,
        access_token: string,
        expires_in: number,
        message: any,
        status: any
    }
    //**Added Section - End */
}
