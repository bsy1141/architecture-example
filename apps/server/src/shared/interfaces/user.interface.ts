export interface IUser {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserWithoutPassword extends Omit<IUser, 'password'> {}

export interface IJwtPayload {
    sub: string;
    email: string;
    iat?: number;
    exp?: number;
}
