import { writeFile,mkdir } from 'fs/promises';
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
  return Buffer.from('Excel binary content'); // placeholder
}

export async function exportToPDF(data) {
  // use pdfkit or puppeteer
  return Buffer.from('PDF binary content'); // placeholder
}

export async function saveReportFile(name, content) {
   const reportsDir = path.join(__dirname, '../../reports');
   console.log('Ensuring reports directory exists at:', reportsDir);
  await mkdir(reportsDir, { recursive: true });
  const filePath = path.join(reportsDir, name);
  console.log('Writing report file to:', filePath);
  await writeFile(filePath, content);
  return `http://yourdomain.com/reports/${name}`;
}