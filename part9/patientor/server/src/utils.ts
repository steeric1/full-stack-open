import {
  Entry,
  Gender,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from './types';

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

  let entries: Entry[] | undefined = undefined;
  if ('entries' in object) entries = parseEntries(object.entries);

  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: entries ?? [],
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

export const parseEntries = (object: unknown): Entry[] => {
  if (!Array.isArray(object)) {
    throw new Error('Invalid entries');
  }

  return object.map((obj) => parseEntry(obj));
};

export const parseEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid entry');
  }

  if (!('type' in object)) {
    throw new Error('Invalid entry, missing type');
  }

  const type = parseString(object.type);
  if (
    !(
      type === 'HealthCheck' ||
      type === 'OccupationalHealthcare' ||
      type === 'Hospital'
    )
  ) {
    throw new Error(`Invalid entry type: '${type}'`);
  }

  // For now, do no other validation
  return object as Entry;
};
