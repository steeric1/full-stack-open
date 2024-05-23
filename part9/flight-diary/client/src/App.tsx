import { useEffect, useState } from "react";

import { Diary, NewDiary } from "./types";
import { createDiary as createNewDiary, getAllDiaries } from "./diaryService";

import DiaryEntries from "./components/DiaryEntries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const createDiary = async (newDiary: NewDiary) => {
    const diary = await createNewDiary(newDiary);
    setDiaries(diaries.concat(diary));
  };

  return (
    <>
      <DiaryForm createDiary={createDiary} />
      <DiaryEntries entries={diaries} />
    </>
  );
};

export default App;
