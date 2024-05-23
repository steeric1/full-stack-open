import { useEffect, useState } from "react";

import { Diary } from "./types";
import { getAllDiaries } from "./diaryService";
import DiaryEntries from "./components/DiaryEntries";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return <DiaryEntries entries={diaries} />;
};

export default App;
