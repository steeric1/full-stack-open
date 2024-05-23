export interface Diary {
  id: number;
  weather: string;
  visibility: string;
  date: string;
  comment?: string;
}

export type NewDiary = Omit<Diary, "id">;
