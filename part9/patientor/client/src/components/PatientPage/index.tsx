import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Patient } from "../../types";
import Entries from "./Entries";
import PatientInfo from "./PatientInfo";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((pat) => setPatient(pat));
    }
  }, [id]);

  if (!patient) return null;

  return (
    <div className="App">
      <PatientInfo patient={patient} />
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
