interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Part[];
}

const Content = ({ parts }: ContentProps) => {
  return parts.map((p) => (
    <p key={p.name}>
      {p.name} {p.exerciseCount}
    </p>
  ));
};

export default Content;
