import { Box, TableCell, TableRow } from "@mui/material";

import { Entry, HealthCheckRating } from "../../types";
import DiagnosisDetails from "./DiagnosisDetails";
import {
  HealthAndSafetyRounded,
  LocalHospitalRounded,
  MedicalInformationRounded,
  SignalCellular1BarRounded,
  SignalCellular2BarRounded,
  SignalCellular3BarRounded,
  SignalCellular4BarRounded,
} from "@mui/icons-material";

interface Props {
  entry: Entry;
  displayHealth: boolean;
  displayInfo: boolean;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled: ${JSON.stringify(value)}`);
};

const EntryRow = ({ entry, displayHealth, displayInfo }: Props) => {
  let type = null;
  let info = <em>-</em>;
  let health = <em>-</em>;
  switch (entry.type) {
    case "HealthCheck":
      type = <HealthAndSafetyRounded fontSize="medium" color="secondary" />;

      switch (entry.healthCheckRating) {
        case HealthCheckRating.CriticalRisk:
          health = <SignalCellular1BarRounded color="error" />;
          break;
        case HealthCheckRating.HighRisk:
          health = <SignalCellular2BarRounded color="secondary" />;
          break;
        case HealthCheckRating.LowRisk:
          health = <SignalCellular3BarRounded color="warning" />;
          break;
        case HealthCheckRating.Healthy:
          health = <SignalCellular4BarRounded color="success" />;
          break;
        default:
          assertNever(entry.healthCheckRating);
      }
      break;
    case "OccupationalHealthcare":
      type = (
        <Box style={{ display: "flex", alignItems: "end", gap: "8px" }}>
          <MedicalInformationRounded fontSize="medium" color="primary" />
          <strong>{entry.employerName}</strong>
        </Box>
      );

      if (entry.sickLeave) {
        const { startDate, endDate } = entry.sickLeave;
        info = (
          <span>
            <Box style={{ marginBottom: "4px" }}>
              <strong>Sick leave</strong>
            </Box>
            <span>{new Date(startDate).toLocaleDateString()}</span>
            <span>&nbsp;&ndash;&nbsp;</span>
            <span>{new Date(endDate).toLocaleDateString()}</span>
          </span>
        );
      }

      break;
    case "Hospital":
      type = <LocalHospitalRounded fontSize="medium" color="error" />;

      if (entry.discharge) {
        const { date, criteria } = entry.discharge;
        info = (
          <span>
            <Box style={{ marginBottom: "4px" }}>
              <strong>Discharge</strong>
            </Box>
            <span>{new Date(date).toLocaleDateString()}</span>
            <span>&nbsp;&ndash;&nbsp;</span>
            <span>
              <em>{criteria}</em>
            </span>
          </span>
        );
      }

      break;
    default:
      assertNever(entry);
  }

  return (
    <TableRow>
      <TableCell style={{ textAlign: "center" }}>{type}</TableCell>
      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
      <TableCell>{entry.description}</TableCell>
      {displayHealth && <TableCell>{health}</TableCell>}
      <TableCell>
        {entry.diagnosisCodes ? (
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                <DiagnosisDetails code={code} />
              </li>
            ))}
          </ul>
        ) : (
          <em>none</em>
        )}
      </TableCell>
      <TableCell>{entry.specialist}</TableCell>
      {displayInfo && <TableCell>{info}</TableCell>}
    </TableRow>
  );
};

export default EntryRow;
