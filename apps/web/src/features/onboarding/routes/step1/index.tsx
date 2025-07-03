import { useNavigate } from 'react-router-dom';
import './styles.scss';

const Step1 = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/onboarding/step2');
    };

    return (
        <div className="step1">
            <h1>온보딩 Step 1</h1>
            <p>첫 번째 단계입니다.</p>
            <button onClick={handleNext}>다음 단계로</button>
        </div>
    );
};

export default Step1;
