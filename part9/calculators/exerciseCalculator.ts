import { asNumbers } from './utils';

interface TrainingInput {
  hours: number[];
  dailyTarget: number;
}

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

const parseArgs = (args: string[]): TrainingInput => {
  if (args.length < 2) throw new Error('Missing arguments');

  const [dailyTarget, ...hours] = asNumbers(args);

  return {
    dailyTarget,
    hours,
  };
};

try {
  const { hours, dailyTarget } = parseArgs(process.argv.slice(2));
  console.log(calculateExercises(hours, dailyTarget));
} catch (error) {
  let message = 'Something went wrong';
  if (error instanceof Error) {
    message += ` Error: ${error.message}`;
  }
  console.error(message);
}
