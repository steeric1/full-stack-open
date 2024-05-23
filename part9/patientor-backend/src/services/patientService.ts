import patients from '../../data/patients';
import { NonSensitivePatient } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitive } = p;
    return nonSensitive;
  });
};

export default { getNonSensitivePatients };
