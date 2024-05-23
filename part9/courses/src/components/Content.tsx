import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return parts.map((p, idx) => (
    <div key={p.name}>
      <Part part={p} />
      {idx < parts.length - 1 && <br />}
    </div>
  ));
};

export default Content;
