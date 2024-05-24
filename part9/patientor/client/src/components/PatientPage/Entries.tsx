import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  return (
    <div>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        Entries
      </Typography>
      {entries.length === 0 ? (
        <Typography>
          <em>No entries.</em>
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Diagnoses</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  {new Date(entry.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>
                  {entry.diagnosisCodes ? (
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {entry.diagnosisCodes.map((code) => (
                        <li key={code}>{code}</li>
                      ))}
                    </ul>
                  ) : (
                    <em>none</em>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Entries;
