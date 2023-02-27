import { useState } from "react";

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}> {text} </button>
);

const StatisticsLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ feedback }) => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;

    if (total === 0) {
        return (
            <>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </>
        );
    }

    return (
        <>
            <h1>statistics</h1>
            <table>
                <StatisticsLine text={"good"} value={good} />
                <StatisticsLine text={"neutral"} value={neutral} />
                <StatisticsLine text={"bad"} value={bad} />
                <StatisticsLine text={"all"} value={total} />
                <StatisticsLine text={"average"} value={(good - bad) / total} />
                <StatisticsLine
                    text={"positive"}
                    value={`${(good / total) * 100} %`}
                />
            </table>
        </>
    );
};

const App = () => {
    const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

    const incrementFeedback = (name) => ({
        ...feedback,
        [name]: feedback[name] + 1,
    });

    return (
        <>
            <h1>give feedback</h1>

            <Button
                handleClick={() => setFeedback(incrementFeedback("good"))}
                text={"good"}
            />

            <Button
                handleClick={() => setFeedback(incrementFeedback("neutral"))}
                text={"neutral"}
            />

            <Button
                handleClick={() => setFeedback(incrementFeedback("bad"))}
                text={"bad"}
            />

            <Statistics feedback={feedback} />
        </>
    );
};

export default App;
