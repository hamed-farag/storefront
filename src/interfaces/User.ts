export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
}

export interface UserCreatedReturnType {
    token: string;
}

export interface UserGetReturnedType {
    id: string;
}
