import { useState } from "react";

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}> {text} </button>
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
            <div>
                good {good}
                <br />
                neutral {neutral}
                <br />
                bad {bad}
                <br />
                all {total}
                <br />
                average {(good - bad) / total}
                <br />
                positive {(good / total) * 100} %
            </div>
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
