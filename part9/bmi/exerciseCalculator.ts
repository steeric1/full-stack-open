interface TrainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hours: number[],
  dailyTarget: number
): TrainingData => {
  const trainingDays = hours.filter((h) => h > 0).length;
  const avg = hours.reduce((sum, h) => sum + h, 0) / hours.length;

  const reachedPct = avg / dailyTarget;
  let ratingDescription: string, rating: number;
  if (reachedPct < 0.5) {
    ratingDescription = 'you should try harder!';
    rating = 1;
  } else if (reachedPct < 1) {
    ratingDescription = "that's good effort!";
    rating = 2;
  } else {
    ratingDescription = 'congrats! you reached the goal!';
    rating = 3;
  }

  return {
    periodLength: hours.length,
    trainingDays,
    success: avg >= dailyTarget,
    rating,
    ratingDescription,
    target: dailyTarget,
    average: avg,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
