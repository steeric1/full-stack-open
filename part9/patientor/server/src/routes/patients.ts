import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const patient = patientService.addPatient(toNewPatient(req.body));
    res.json(patient);
  } catch (error) {
    let message = 'Something went wrong.';
    if (error instanceof Error) {
      message += ' Error: ' + error.message;
    }

    res.status(400).send(message);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findPatientById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});

export default router;
