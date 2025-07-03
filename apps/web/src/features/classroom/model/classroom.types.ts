export interface ClassroomState {
    classrooms: Classroom[];
    selectedClassroom: Classroom | null;
    loading: boolean;
    error: string | null;
}

export interface Classroom {
    id: string;
    name: string;
    description: string;
    teacherId: string;
    teacher: Teacher;
    students: Student[];
    assignments: Assignment[];
    announcements: Announcement[];
    inviteCode: string;
    settings: ClassroomSettings;
    createdAt: string;
    updatedAt: string;
}

export interface Teacher {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    joinedAt: string;
    lastActiveAt: string;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    maxPoints: number;
    submissions: Submission[];
    createdAt: string;
    updatedAt: string;
}

export interface Submission {
    id: string;
    studentId: string;
    student: Student;
    content: string;
    attachments: Attachment[];
    points?: number;
    feedback?: string;
    submittedAt: string;
    gradedAt?: string;
}

export interface Attachment {
    id: string;
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    important: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ClassroomSettings {
    allowStudentPosts: boolean;
    allowStudentComments: boolean;
    requireApprovalForPosts: boolean;
    notifyOnNewPosts: boolean;
    notifyOnNewComments: boolean;
}

export interface ClassroomFilters {
    role?: 'teacher' | 'student';
    status?: 'active' | 'archived';
    subject?: string;
    search?: string;
}

export interface ClassroomSort {
    field: 'name' | 'createdAt' | 'updatedAt' | 'studentCount';
    order: 'asc' | 'desc';
}
