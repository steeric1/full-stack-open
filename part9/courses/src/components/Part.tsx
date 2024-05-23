import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled part: ${JSON.stringify(value)}`);
  };

  const title = (
    <div>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
    </div>
  );
  switch (part.kind) {
    case "basic":
      return (
        <div>
          {title}
          <div>
            <em>{part.description}</em>
          </div>
        </div>
      );
    case "group":
      return (
        <div>
          {title}
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div>
          {title}
          <div>
            <em>{part.description}</em>
          </div>
          <div>read {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          {title}
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
