import { Gender, NewPatient, NonSensitivePatient, Patient } from './types';

export const toNonSensitivePatient = ({
  ssn: _,
  ...rest
}: Patient): NonSensitivePatient => {
  return rest;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  if (
    !(
      'name' in object &&
      'dateOfBirth' in object &&
      'ssn' in object &&
      'gender' in object &&
      'occupation' in object
    )
  ) {
    throw new Error('Invalid data: missing fields');
  }

  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
};

export const parseString = (object: unknown): string => {
  if (!(object && (typeof object === 'string' || object instanceof String))) {
    throw new Error('Invalid or missing string');
  }

  return object.toString();
};

export const parseDate = (object: unknown): string => {
  const str = parseString(object);
  const date = Date.parse(str);
  if (!date) {
    throw new Error(`Invalid date: '${str}'`);
  }

  return str;
};

export const parseGender = (object: unknown): Gender => {
  if (!isGender(object)) {
    throw new Error(`Invalid gender: '${object}'`);
  }

  return object;
};

export const isGender = (object: unknown): object is Gender => {
  const str = parseString(object);
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(str);
};
