interface TotalProps {
  count: number;
}

const Total = ({ count }: TotalProps) => <p>Number of exercises {count}</p>;

export default Total;
