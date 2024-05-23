import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [topicText, setTopicText] = useState('');
    const [levelText, setLevelText] = useState('');
    const [totalPoints, setTotalPoints] = useState('');
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    // Load questions from local storage on component mount
    useEffect(() => {
        const storedQuestions = localStorage.getItem('questions');
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        }
    }, []);

    // Save questions to local storage whenever questions change
    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);

    const handlePrintQuestions = () => {
        console.log(questions);
    };

    const handleAddAnswer = () => {
        if (answerText.trim() !== '') {
            setAnswers([...answers, answerText]);
            setAnswerText('');
        }
    };

    const handleAddQuestion = () => {
        if (questionText.trim() !== '' && answers.length > 1 &&  correctAnswerIndex !== null) {
            setQuestions([...questions, { question: questionText, answers, topic: topicText, level: levelText, points: totalPoints, correctAnswer: answers[correctAnswerIndex] }]);
            setQuestionText('');
            setAnswers([]);
            setAnswerText('');
            setTopicText('');
            setLevelText('');
            setTotalPoints('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Prepare data to be sent
        const data = Object.values(questions);
        console.log(data);

        if (questions.length === 0) {
            return;
        }
        
        try {
            // Send data to the server
            const response = await fetch('http://192.168.0.111:8080/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);

              // Navigate to the success page with the response message
              navigate('/success', { state: { message: result.message } });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Quiz Form</h1>
            {/* <form method="post" action="http://192.168.0.111:8080/api/submit" > */}
            <form onSubmit={handleSubmit}>
            <div>
                <label><strong>Enter your question : </strong></label>
                <input 
                    type="text" 
                    value={questionText} 
                    onChange={(e) => setQuestionText(e.target.value)} 
                /><br/><br/>
                <label><strong>Enter your options : </strong></label>
                <input 
                    type="text" 
                    value={answerText} 
                    onChange={(e) => setAnswerText(e.target.value)} 
                />
                <button type="button" onClick={handleAddAnswer}>Add Options</button>
                <div>
                <ul>
                    {answers.map((answer, index) => (
                        <li key={index}>                
                        <input 
                            type="radio" 
                            name="correctAnswer" 
                            checked={correctAnswerIndex === index} 
                            onChange={() => setCorrectAnswerIndex(index)} 
                        />
                       {answer}</li>                        
    
                    ))}
                </ul>
            </div>

               <label><strong>Enter which topic belongs to : </strong></label>
                <input 
                    type="text" 
                    value={topicText} 
                    onChange={(e) => setTopicText(e.target.value)} 
                /><br/><br/>
                <label><strong>Enter question level: </strong></label>
                <input 
                    type="text" 
                    value={levelText} 
                    onChange={(e) => setLevelText(e.target.value)} 
                /><br/><br/>
                <label><strong>Enter a total points : </strong></label>
                <input 
                    type="text" 
                    value={totalPoints} 
                    onChange={(e) => setTotalPoints(e.target.value)} 
                /><br/><br/>

                <button type="button" onClick={handleAddQuestion}>Add Question</button>
                {/* <button type="button" onClick={handlePrintQuestions}>Submit</button> */}
                <button type="submit" >Submit</button>
            </div>
            </form>
            <div>
                <h2>Questions</h2>
                <ul>
                    {questions.map((item, index) => (
                        <li key={index}>
                            <strong>Q{index+1}:</strong> {item.question}<br /><br />
                            <strong>Answer:</strong> {item.correctAnswer}<br /><br />
                            <strong>Topic:</strong> {item.topic}<br /><br />
                            <strong>Level:</strong> {item.level}<br /><br />
                            <strong>Points:</strong> {item.points}<br /><br />
                            <ul>
                                {item.answers.map((answer, ansIndex) => (
                                    <li key={ansIndex} ><strong>{ansIndex + 1} : </strong> 
                                {answer}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuizForm;
