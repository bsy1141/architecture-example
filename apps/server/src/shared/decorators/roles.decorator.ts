import { SetMetadata } from '@nestjs/common';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
