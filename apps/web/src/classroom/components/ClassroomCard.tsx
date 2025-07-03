import React from 'react';
import { Classroom } from '../query-hooks/useClassroom/api';
import { formatDate } from '../../shared/libs/date';

interface ClassroomCardProps {
    classroom: Classroom;
    onJoin?: (classroomId: string) => void;
    onLeave?: (classroomId: string) => void;
    onDelete?: (classroomId: string) => void;
    isTeacher?: boolean;
}

export const ClassroomCard: React.FC<ClassroomCardProps> = ({
    classroom,
    onJoin,
    onLeave,
    onDelete,
    isTeacher = false,
}) => {
    return (
        <div className="classroom-card">
            <div className="classroom-card__header">
                <h3 className="classroom-card__title">{classroom.name}</h3>
                <div className="classroom-card__meta">
                    <span className="classroom-card__date">
                        {formatDate(classroom.createdAt, 'short')}
                    </span>
                    <span className="classroom-card__students">
                        {classroom.students.length}명 참여
                    </span>
                </div>
            </div>

            <div className="classroom-card__body">
                <p className="classroom-card__description">
                    {classroom.description}
                </p>
            </div>

            <div className="classroom-card__footer">
                {isTeacher ? (
                    <div className="classroom-card__actions">
                        <button
                            className="btn btn--secondary"
                            onClick={() => onDelete?.(classroom.id)}
                        >
                            삭제
                        </button>
                        <button className="btn btn--primary">관리</button>
                    </div>
                ) : (
                    <div className="classroom-card__actions">
                        <button
                            className="btn btn--secondary"
                            onClick={() => onLeave?.(classroom.id)}
                        >
                            나가기
                        </button>
                        <button className="btn btn--primary">입장</button>
                    </div>
                )}
            </div>
        </div>
    );
};
