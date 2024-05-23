import { asNumbers } from './utils';

interface BmiInput {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height * height) / (100 * 100));
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

const parseArgs = (args: string[]): BmiInput => {
  if (args.length !== 2)
    throw new Error(
      `Incorrect number of arguments. Expected 2, got ${args.length}`
    );

  const [height, weight] = asNumbers(args);

  return {
    height,
    weight,
  };
};

try {
  const { height, weight } = parseArgs(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (error) {
  let message = 'Something went wrong';
  if (error instanceof Error) {
    message += ` Error: ${error.message}`;
  }
  console.error(message);
}
