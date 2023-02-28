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

export default Course;
