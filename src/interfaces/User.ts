export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
}

export interface UserFullGetType {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    password: string;
}

export interface UserProfileGetType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
}

export interface UserFullGetReturnedType {
    token: string | null;
    profile: UserProfileGetType;
    error?: string;
}

export interface UserCreatedReturnType {
    token: string | null;
    error?: string;
}
