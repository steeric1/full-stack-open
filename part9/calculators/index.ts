import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  console.log(typeof height);
  const [heightNum, weightNum] = [Number(height), Number(weight)];
  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.json({ error: 'malformatted parameters' });
  } else {
    res.json({
      height,
      weight,
      bmi: calculateBmi(heightNum, weightNum),
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((n) => isNaN(Number(n)))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res.status(200).json(
    calculateExercises(
      dailyExercises.map((n) => Number(n)),
      Number(target)
    )
  );
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
