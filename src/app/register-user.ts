export interface RegisterUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    //confirmPassword: string;
    id: string;
    points?: number; 
    //Use ? because old users don't have the field yet.
}
