import Papa from "papaparse";

export async function loadCSV(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();
  return Papa.parse(text, { header: true }).data;
}

export async function loadJSON(filePath) {
  const response = await fetch(filePath);
  return await response.json();
}
