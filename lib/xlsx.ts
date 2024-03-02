import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'; // Import FileSaver.js

import type { User } from '@/lib/types';

export async function saveSortedDataToExcel(data: User[], fileName: string): Promise<void> {
  // Create a new workbook and a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sorted Data');

  // Sort the data array by serial
  const sortedData = data.sort((a, b) => a.serial - b.serial);

  // Define the headers
  worksheet.addRow(['Serial', 'Name', 'ID', 'Password']);

  // Add data to the worksheet
  sortedData.forEach((item: User) => {
    worksheet.addRow([item.serial, item.name, item.id, item.password]);
  });

  // Set column widths for better readability
  worksheet.columns = [
    { header: 'Serial', key: 'serial', width: 10 },
    { header: 'Name', key: 'name', width: 20 },
    { header: 'ID', key: 'id', width: 20 },
    { header: 'Password', key: 'password', width: 15 },
  ];

  // Convert workbook to Blob (for download)
  const excelDataBlob = new Blob([await workbook.xlsx.writeBuffer()], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  // Trigger the download
  saveAs(excelDataBlob, fileName);

  console.log(`Data saved to ${fileName} successfully!`);
}
