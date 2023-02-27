const Header = (props) => (
    <>
        <h1>{props.course}</h1>
    </>
);

const Content = (props) => (
    <>
        {
            props.parts.map((part, i) => (
                <p key={i}>{part.name} {part.exercises}</p>
            ))
        }
    </>
)

const Total = (props) => (
    <>
        <p>Number of exercises {props.parts.map(p => p.exercises).reduce((accumulator, current) => accumulator + current, 0)}</p>
    </>
)

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
    <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
    </div>
    )
}

export default App