import React, { useState } from "react";
import { NewDiary } from "../types";

interface DiaryFormProps {
  createDiary: (diary: NewDiary) => Promise<void>;
}

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await createDiary({
      date,
      visibility,
      weather,
      comment,
    });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  const lineByLine = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={handleSubmit} style={lineByLine}>
        <label htmlFor="date">
          date{" "}
          <input
            id="date"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            required
          />
        </label>
        <label htmlFor="visibility">
          visibility{" "}
          <input
            id="visibility"
            value={visibility}
            onChange={(ev) => setVisibility(ev.target.value)}
            required
          />
        </label>
        <label htmlFor="weather">
          weather{" "}
          <input
            id="weather"
            value={weather}
            onChange={(ev) => setWeather(ev.target.value)}
            required
          />
        </label>
        <label htmlFor="comment">
          comment{" "}
          <input
            id="comment"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
            required
          />
        </label>
        <button style={{ width: "fit-content" }}>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
