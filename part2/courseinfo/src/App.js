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
        {parts.map((part) => (
            <Part part={part} key={part.id} />
        ))}
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
    const courses = [
        {
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
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div>
            {courses.map((course) => (
                <Course course={course} key={course.id} />
            ))}
        </div>
    );
};

export default App;
