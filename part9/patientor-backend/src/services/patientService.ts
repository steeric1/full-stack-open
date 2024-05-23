import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient } from '../types';
import { toNonSensitivePatient } from '../utils';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(toNonSensitivePatient);
};

const addPatient = (newPatient: NewPatient): NonSensitivePatient => {
  const patient: Patient = {
    ...newPatient,
    id: uuid(),
  };

  patients.push(patient);
  return toNonSensitivePatient(patient);
};

export default { getNonSensitivePatients, addPatient };
