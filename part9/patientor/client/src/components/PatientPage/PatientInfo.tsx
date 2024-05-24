import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";

import { Patient } from "../../types";

interface Props {
  patient: Patient;
}

const PatientInfo = ({ patient }: Props) => {
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
    <div>
      <Box style={title}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {patient.name}
        </Typography>
        {genderIcons[patient.gender]}
      </Box>
      <Table style={{ marginBottom: "20px" }}>
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
    </div>
  );
};

export default PatientInfo;
