import React, { useState } from "react";
import { NewDiary } from "../types";

interface DiaryFormProps {
  createDiary: (diary: NewDiary) => Promise<void>;
}

interface RadiosProps {
  options: string[];
  name: string;
  checkedOption: string;
  onSelect: (selected: string) => void;
}

const Radios = ({
  options,
  name,
  checkedOption: checkedValue,
  onSelect,
}: RadiosProps) => {
  const horizontalCenter = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={{ ...horizontalCenter, gap: "10px" }}>
      {name}
      <div style={{ ...horizontalCenter, gap: "5px" }}>
        {options.map((opt) => {
          const id = `${name}__${opt};`;
          return (
            <label key={opt} htmlFor={id} style={horizontalCenter}>
              {opt}
              <input
                type="radio"
                name={name}
                id={id}
                onChange={() => onSelect(opt)}
                checked={checkedValue === opt}
                required
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
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
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const visibilities = ["great", "good", "ok", "poor"];
  const weathers = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  const lineByLine = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={lineByLine}>
        <label htmlFor="date">
          date{" "}
          <input
            type="date"
            id="date"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            required
          />
        </label>

        <Radios
          options={visibilities}
          name="visibility"
          checkedOption={visibility}
          onSelect={(vis) => setVisibility(vis)}
        />

        <Radios
          options={weathers}
          name="weather"
          checkedOption={weather}
          onSelect={(weather) => setWeather(weather)}
        />

        <label htmlFor="comment">
          comment{" "}
          <input
            id="comment"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
        </label>
        <button style={{ width: "fit-content" }}>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
