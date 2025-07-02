import { writeFile } from 'fs/promises';
import path from 'path';
import { Parser } from 'json2csv';

export function exportToCSV(data) {
  const parser = new Parser();
  return parser.parse(data);
}

export function exportToJSON(data) {
  return JSON.stringify(data, null, 2);
}

export async function exportToExcel(data) {
  // use exceljs or sheetjs
  return Buffer.f rom('Excel binary content'); // placeholder
}

export async function exportToPDF(data) {
  // use pdfkit or puppeteer
  return Buffer.from('PDF binary content'); // placeholder
}

export async function saveReportFile(name, content) {
  const filePath = path.join(__dirname, `../../reports/${name}`);
  await writeFile(filePath, content);
  return `http://yourdomain.com/reports/${name}`;
}