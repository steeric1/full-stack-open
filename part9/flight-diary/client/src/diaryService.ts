import axios from "axios";

import { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

export const createDiary = async (diary: NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(baseUrl, diary);
  return response.data;
};
