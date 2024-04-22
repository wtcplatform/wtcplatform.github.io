import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'; // Import FileSaver.js
import type { User, VoteByOther } from '@/lib/types';
// import { db } from './firebase'; // Example import, adjust based on your Firebase setup
// import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

// アカウント一覧を.xlsxファイルに出力する
export async function saveSortedDataToExcel(data: User[], fileName: string): Promise<void> {
  // Create a new workbook a  nd a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sorted Data');

  // Sort the data array by serial
  const sortedData = data.sort((a, b) => a.serial - b.serial);

  // Define the headers
  worksheet.addRow(['serial', 'name', 'id', 'password']);

  // Add data to the worksheet
  sortedData.forEach((item: User) => {
    worksheet.addRow([item.serial, item.name, item.id, item.password]);
  });

  // Set column widths for better readability
  worksheet.columns = [
    { header: 'serial', key: 'serial', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'id', key: 'id', width: 20 },
    { header: 'password', key: 'password', width: 15 },
  ];

  // Convert workbook to Blob (for download)
  const excelDataBlob = new Blob([await workbook.xlsx.writeBuffer()], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  // Trigger the download
  saveAs(excelDataBlob, fileName);

  console.log(`Data saved to ${fileName} successfully!`);
}


export async function processVoteDataFromExcel(file: File) {
  // Create a new workbook instance
  console.log('file:', file);
  const workbook = new ExcelJS.Workbook();
  // Assuming filename is a path to the .xlsx file
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);

  // Assuming data is in the first worksheet
  const worksheet = workbook.getWorksheet(1);
  const voteData: VoteByOther = {};

  if (worksheet === undefined) {
    throw new Error('No worksheet found in the file');
  }
  
  worksheet.eachRow((row, rowNumber) => {
    // Skip the header row and any row that doesn't start with a date
    if (!row.getCell(1).text.match(/.*\d{2}-\d{2}/)) return;

    // console.log(rowNumber);
    // Extract the date from the first cell
    const date = `2024-${row.getCell(1).text}`;
    if (!voteData[date]) {
      voteData[date] = {};
    }

    // Loop through each time slot
    for (let col = 2; col <= 7; col++) {
      const timeSlot = worksheet.getRow(1).getCell(col).text;
      
      for (let itemRow = rowNumber + 1; itemRow < rowNumber + 13; itemRow++) {
        // Getting item label from the first column of the current itemRow
        const itemLabel = worksheet.getRow(itemRow).getCell(1).text;
        if (itemLabel.length === 0) {
          continue;
        }

        const voteCount = worksheet.getRow(itemRow).getCell(col).text;
        if (voteCount === '休') {
          continue;
        } 

        // Check if vote count is a number and not '休'
        if (!voteData[date][itemLabel]) {
          voteData[date][itemLabel] = {};
        }
        voteData[date][itemLabel][timeSlot] = parseInt(voteCount);
      }
    }
  });

  // Here you would normally push to Firestore
  // This is how the output object looks like
  return voteData;
}

export const writeVoteDataToExcel = async (voteData: VoteByOther) => {
  const times = ["06:30", "08:30", "10:30", "12:30", "14:30", "16:30", "18:30"];
  const courts = ["1番", "2番", "3番", "4番", "5番", "6番", "7番", "8番", "9番", "10番", "11番", "12番"]; 
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Votes');

  // Iterate through each date in voteData
  Object.keys(voteData).sort().forEach((date) => {
    worksheet.addRow([date.slice(-5), ...times]);
    const items = voteData[date];
    courts.forEach((court) => {
      const courtData = items[court];
      const timeRow = times.map((time) => {
        return (time in courtData) ? courtData[time] : "休";
      });
      
      worksheet.addRow([court, ...timeRow]);
    });

    // Adding empty rows for spacing
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
  });

  // Generate a Blob from the workbook
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

  // Create a link and trigger the download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = 'voteData.xlsx'; // Specify the download file name
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link); // Clean up
  URL.revokeObjectURL(url); // Free up memory
};



// Usage:
// readVoteDestination('/path/to/your/file.xlsx').then(data => {
//   // Push to Firestore or use data as needed
// });