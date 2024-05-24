import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Male, Female } from "@mui/icons-material";

import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((pat) => setPatient(pat));
    }
  }, [id]);

  if (!patient) return null;

  const genderIcons = {
    male: <Male fontSize="large" />,
    female: <Female fontSize="large" />,
    other: null,
  };

  const title = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "20px",
    marginBottom: "20px",
  };

  return (
    <div className="App">
      <Box style={title}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {patient.name}
        </Typography>
        {genderIcons[patient.gender]}
      </Box>
      <Box>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Social Security Number</strong>
              </TableCell>
              <TableCell>{patient.ssn ?? <em>unknown</em>}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Occupation</strong>
              </TableCell>
              <TableCell>{patient.occupation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default PatientPage;
