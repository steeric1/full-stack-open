import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Entry } from "../../types";
import EntryRow from "./EntryRow";

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  const displayHealth = entries.some((entry) => entry.type === "HealthCheck");
  const displayInfo = entries.some(
    (entry) => "discharge" in entry || "sickLeave" in entry
  );
  return (
    <div>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        Entries
      </Typography>
      {entries.length === 0 ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <em>This patient has no entries.</em>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              {displayHealth && (
                <TableCell>
                  <strong>Health</strong>
                </TableCell>
              )}
              <TableCell>
                <strong>Diagnoses</strong>
              </TableCell>
              <TableCell>
                <strong>Specialist</strong>
              </TableCell>
              {displayInfo && (
                <TableCell>
                  <strong>Information</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <EntryRow
                key={entry.id}
                {...{ entry, displayHealth, displayInfo }}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Entries;
