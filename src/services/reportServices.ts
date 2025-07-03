import { exportToCSV, exportToPDF, exportToExcel, exportToJSON, saveReportFile } from '../utils/reportExporters';

export const ReportService = {
  async generate(metrics, filters, userId) {
  let data = [];

  for (const metric of metrics) {
    const result = await this.fetchMetricData(metric, userId, filters);

    // Flatten for CSV: if result is an array, add each with metric; else, add single row
    if (Array.isArray(result)) {
      result.forEach(item => data.push({ metric, ...item }));
    } else {
      data.push({ metric, ...result });
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `report-${userId}-${timestamp}`;

  let fileUrl = '';
  let fileData = '';

  switch (filters.format) {
    case 'CSV':
      fileData = exportToCSV(data);
      fileUrl = await saveReportFile(fileName + '.csv', fileData);
      break;
    case 'JSON':
      fileData = exportToJSON(data);
      fileUrl = await saveReportFile(fileName + '.json', fileData);
      break;
    case 'EXCEL':
      fileData = await exportToExcel(data);
      fileUrl = await saveReportFile(fileName + '.xlsx', fileData);
      break;
    case 'PDF':
      fileData = await exportToPDF(data);
      fileUrl = await saveReportFile(fileName + '.pdf', fileData);
      break;
    default:
      throw new Error('Unsupported report format');
  }

  return {
    downloadUrl: fileUrl,
    data: filters.format === 'JSON' ? fileData : '',
    generatedAt: new Date(),
    format: filters.format
  };
},

  async fetchMetricData(metric, userId, filters) {
  const { categories = [], timeRange } = filters;

  switch (metric) {
    case 'LEARNING_TIME':
      // Example: Return total learning time per category
      return categories.map(category => ({
        category,
        totalMinutes: Math.floor(Math.random() * 200), // mock data
        period: `${timeRange.from} to ${timeRange.to}`
      }));
    case 'ASSESSMENT_SCORES':
      // Example: Return assessment scores per category
      return categories.flatMap(category =>
    [
      { 
        category,
        assessment: 'Quiz 1',
        score: Math.floor(Math.random() * 100)
      },
      { 
        category,
        assessment: 'Quiz 2',
        score: Math.floor(Math.random() * 100)
      }
    ]
  );
    
    // Add more cases as needed
    default:
      return { message: 'Metric not implemented', categories };
  }
}
};