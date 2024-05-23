import axios from "axios";

import { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

export const createDiary = async (diary: NewDiary): Promise<Diary> => {
  try {
    const response = await axios.post<Diary>(baseUrl, diary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.replace("Something went wrong. ", "")
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
