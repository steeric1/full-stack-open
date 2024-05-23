import { Diary } from "../types";

interface DiaryEntriesProps {
  entries: Diary[];
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>visibility: {entry.visibility}</div>
          <div>weather: {entry.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
