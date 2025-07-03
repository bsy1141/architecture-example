import { useNavigate } from 'react-router-dom';
import './styles.scss';

const Step2 = () => {
    const navigate = useNavigate();

    const handleComplete = () => {
        navigate('/classroom');
    };

    return (
        <div className="step2">
            <h1>온보딩 Step 2</h1>
            <p>두 번째 단계입니다.</p>
            <button onClick={handleComplete}>온보딩 완료</button>
        </div>
    );
};

export default Step2;
