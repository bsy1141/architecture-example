import { ApiClient } from '../../../shared/api/client';

export interface Classroom {
    id: string;
    name: string;
    description: string;
    teacherId: string;
    students: Student[];
    createdAt: string;
    updatedAt: string;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    joinedAt: string;
}

export interface CreateClassroomRequest {
    name: string;
    description: string;
}

export interface JoinClassroomRequest {
    inviteCode: string;
}

export const classroomApi = {
    getAllClassrooms: async (): Promise<Classroom[]> => {
        const response = await ApiClient.get('/classrooms');
        return response.data;
    },

    getClassroomById: async (id: string): Promise<Classroom> => {
        const response = await ApiClient.get(`/classrooms/${id}`);
        return response.data;
    },

    createClassroom: async (
        data: CreateClassroomRequest,
    ): Promise<Classroom> => {
        const response = await ApiClient.post('/classrooms', data);
        return response.data;
    },

    joinClassroom: async (data: JoinClassroomRequest): Promise<Classroom> => {
        const response = await ApiClient.post('/classrooms/join', data);
        return response.data;
    },

    leaveClassroom: async (id: string): Promise<void> => {
        await ApiClient.delete(`/classrooms/${id}/leave`);
    },

    deleteClassroom: async (id: string): Promise<void> => {
        await ApiClient.delete(`/classrooms/${id}`);
    },

    getStudents: async (classroomId: string): Promise<Student[]> => {
        const response = await ApiClient.get(
            `/classrooms/${classroomId}/students`,
        );
        return response.data;
    },

    removeStudent: async (
        classroomId: string,
        studentId: string,
    ): Promise<void> => {
        await ApiClient.delete(
            `/classrooms/${classroomId}/students/${studentId}`,
        );
    },
};
