import React from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { message } = location.state || { message: 'No message' };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Submission Successful</h1>
            <p>{message}</p>
            <button onClick={handleBack}>Back to Quiz</button>
        </div>
    );
};

export default SuccessPage;
