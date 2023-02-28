const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
    <p>
        <strong>total of {sum} exercises</strong>
    </p>
);

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => (
    <>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />
    </>
);

const Course = ({ course }) => {
    const { name, parts } = course;

    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total
                sum={parts.reduce(
                    (previous, current) => previous + current.exercises,
                    0
                )}
            />
        </>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        id: 1,
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
        ],
    };

    return (
        <div>
            <Course course={course} />
        </div>
    );
};

export default App;
