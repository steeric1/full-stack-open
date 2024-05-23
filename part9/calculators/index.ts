import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
