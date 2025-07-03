import { useState, useEffect, useCallback } from 'react';
import {
    classroomApi,
    Classroom,
    CreateClassroomRequest,
    JoinClassroomRequest,
} from './api';

export const useClassroom = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClassrooms = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await classroomApi.getAllClassrooms();
            setClassrooms(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : '클래스룸을 불러오는데 실패했습니다.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const createClassroom = useCallback(
        async (data: CreateClassroomRequest) => {
            try {
                const newClassroom = await classroomApi.createClassroom(data);
                setClassrooms(prev => [...prev, newClassroom]);
                return { success: true, classroom: newClassroom };
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err.message
                        : '클래스룸 생성에 실패했습니다.';
                setError(error);
                return { success: false, error };
            }
        },
        [],
    );

    const joinClassroom = useCallback(async (data: JoinClassroomRequest) => {
        try {
            const classroom = await classroomApi.joinClassroom(data);
            setClassrooms(prev => [...prev, classroom]);
            return { success: true, classroom };
        } catch (err) {
            const error =
                err instanceof Error
                    ? err.message
                    : '클래스룸 참여에 실패했습니다.';
            setError(error);
            return { success: false, error };
        }
    }, []);

    const leaveClassroom = useCallback(async (classroomId: string) => {
        try {
            await classroomApi.leaveClassroom(classroomId);
            setClassrooms(prev => prev.filter(c => c.id !== classroomId));
            return { success: true };
        } catch (err) {
            const error =
                err instanceof Error
                    ? err.message
                    : '클래스룸 나가기에 실패했습니다.';
            setError(error);
            return { success: false, error };
        }
    }, []);

    const deleteClassroom = useCallback(async (classroomId: string) => {
        try {
            await classroomApi.deleteClassroom(classroomId);
            setClassrooms(prev => prev.filter(c => c.id !== classroomId));
            return { success: true };
        } catch (err) {
            const error =
                err instanceof Error
                    ? err.message
                    : '클래스룸 삭제에 실패했습니다.';
            setError(error);
            return { success: false, error };
        }
    }, []);

    useEffect(() => {
        fetchClassrooms();
    }, [fetchClassrooms]);

    return {
        classrooms,
        loading,
        error,
        createClassroom,
        joinClassroom,
        leaveClassroom,
        deleteClassroom,
        refetch: fetchClassrooms,
    };
};
