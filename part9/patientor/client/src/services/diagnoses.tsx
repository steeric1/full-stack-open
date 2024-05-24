import axios from "axios";

import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getByCode = async (
  code: Diagnosis["code"]
): Promise<Diagnosis | undefined> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data.find((d) => d.code === code);
};

export default {
  getByCode,
};
