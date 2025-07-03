import React from 'react';
import { Student } from '../query-hooks/useClassroom/api';
import dayjs from 'dayjs';

interface StudentListProps {
    students: Student[];
    onRemoveStudent?: (studentId: string) => void;
    isTeacher?: boolean;
}

export const StudentList: React.FC<StudentListProps> = ({
    students,
    onRemoveStudent,
    isTeacher = false,
}) => {
    if (students.length === 0) {
        return (
            <div className="student-list-empty">
                <p>아직 참여한 학생이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="student-list">
            <div className="student-list__header">
                <h3>참여 학생 ({students.length}명)</h3>
            </div>

            <div className="student-list__items">
                {students.map(student => (
                    <div key={student.id} className="student-item">
                        <div className="student-item__avatar">
                            <img
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                                alt={student.name}
                                className="student-item__avatar-image"
                            />
                        </div>

                        <div className="student-item__info">
                            <h4 className="student-item__name">
                                {student.name}
                            </h4>
                            <p className="student-item__email">
                                {student.email}
                            </p>
                            <p className="student-item__joined">
                                {`${dayjs(student.joinedAt).format('YYYY-MM-DD')} 참여`}
                            </p>
                        </div>

                        {isTeacher && (
                            <div className="student-item__actions">
                                <button
                                    className="btn btn--secondary btn--sm"
                                    onClick={() =>
                                        onRemoveStudent?.(student.id)
                                    }
                                >
                                    제거
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
