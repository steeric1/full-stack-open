import { useEffect, useState } from "react";

import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";

interface Props {
  code: Diagnosis["code"];
}

const DiagnosisDetails = ({ code }: Props) => {
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    diagnosisService
      .getByCode(code)
      .then((diagnosis) => diagnosis && setName(diagnosis.name));
  }, [code]);

  return (
    <span>
      {code} {name}
    </span>
  );
};

export default DiagnosisDetails;
