// import * as ExcelJS from "exceljs";
// import FileSaver from "file-saver";
// import { utils, write } from "xlsx";

// // Hàm downloadXLSX cũ với xlsx (không hỗ trợ styling)
// export const downloadXLSXBasic = (aoa: string[][], fileName: string, merges: any[] = []) => {
//   const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   const ws = utils.aoa_to_sheet(aoa);
//   ws["!merges"] = merges;
//   const wb = { Sheets: { Sheet1: ws }, SheetNames: ["Sheet1"] };
//   const excelBuffer = write(wb, {
//     bookType: "xlsx",
//     type: "array",
//     bookSST: false,
//   });
//   const data = new Blob([excelBuffer], { type: fileType });
//   FileSaver.saveAs(data, `${fileName}${fileExtension}`);
// };

// // Hàm downloadXLSX với custom styling options
// export const downloadXLSXWithCustomStyle = async (
//   aoaListData: {
//     sheetName: string;
//     aoa: (string | { value: any; config?: Partial<ExcelJS.Cell> })[][];
//     options: {
//       merges?: any[];
//       headerStyle?: Partial<ExcelJS.Style>;
//       cellStyle?: Partial<ExcelJS.Style>;
//       autoFitColumns?: boolean;
//       headerHeight?: number;
//     };
//   }[],
//   fileName: string,
// ) => {
//   const fileExtension = ".xlsx";

//   try {
//     const workbook = new ExcelJS.Workbook();
//     aoaListData.forEach((item) => {
//       const { aoa, options, sheetName } = item;
//       const worksheet = workbook.addWorksheet(sheetName);
//       const { merges = [], headerStyle = {}, cellStyle = {}, autoFitColumns = true, headerHeight = 25 } = options || {};
//       // Default styles
//       const defaultHeaderStyle: Partial<ExcelJS.Style> = {
//         font: { bold: true, size: 12 },
//         //   fill: {
//         //     type: "pattern",
//         //     pattern: "solid",
//         //     fgColor: { argb: "FFE0E0E0" },
//         //   },
//         alignment: {
//           horizontal: "center",
//           vertical: "middle",
//           wrapText: true,
//         },
//         //   border: {
//         //     top: { style: "thin", color: { argb: "FF000000" } },
//         //     left: { style: "thin", color: { argb: "FF000000" } },
//         //     bottom: { style: "thin", color: { argb: "FF000000" } },
//         //     right: { style: "thin", color: { argb: "FF000000" } },
//         //   },
//       };

//       const defaultCellStyle: Partial<ExcelJS.Style> = {
//         //   border: {
//         //     top: { style: "thin", color: { argb: "FF000000" } },
//         //     left: { style: "thin", color: { argb: "FF000000" } },
//         //     bottom: { style: "thin", color: { argb: "FF000000" } },
//         //     right: { style: "thin", color: { argb: "FF000000" } },
//         //   },
//         alignment: {
//           vertical: "middle",
//           // wrapText: true,
//         },
//       };

//       // Merge styles
//       const finalHeaderStyle = { ...defaultHeaderStyle, ...headerStyle };
//       const finalCellStyle = { ...defaultCellStyle, ...cellStyle };

//       // Thêm dữ liệu và styling
//       aoa.forEach((row, rowIndex) => {
//         const wsRow = worksheet.addRow(row.map((cell) => (typeof cell === "object" && cell !== null ? cell.value : cell)));

//         wsRow.eachCell((cell, colNumber) => {
//           const configCell = row[colNumber - 1];
//           if (typeof configCell === "object" && configCell !== null && configCell.config) {
//             // Apply custom cell config if provided
//             Object.assign(cell, configCell.config);
//           }
//           if (rowIndex === 0) {
//             // Apply header style
//             Object.assign(cell, finalHeaderStyle);
//           } else {
//             // Apply cell style
//             Object.assign(cell, finalCellStyle);
//           }
//         });
//       });

//       // Apply merges
//       if (merges && merges.length > 0) {
//         merges.forEach((merge) => {
//           try {
//             if (merge.s && merge.e) {
//               const startRow = merge.s.r + 1;
//               const startCol = merge.s.c + 1;
//               const endRow = merge.e.r + 1;
//               const endCol = merge.e.c + 1;
//               worksheet.mergeCells(startRow, startCol, endRow, endCol);
//             }
//           } catch (error) {
//             console.warn("Error merging cells:", error);
//           }
//         });
//       }

//       // Auto-fit columns
//       if (autoFitColumns) {
//         worksheet.columns.forEach((column) => {
//           let maxLength = 0;
//           column.eachCell?.({ includeEmpty: false }, (cell) => {
//             const cellValue = cell.value ? cell.value.toString() : "";
//             if (cellValue.length > maxLength) {
//               maxLength = cellValue.length;
//             }
//           });
//           let calculatedWidth: number;
//           if (maxLength < 8) {
//             calculatedWidth = 8;
//           } else if (maxLength > 50) {
//             calculatedWidth = 50;
//           } else {
//             calculatedWidth = maxLength + 2;
//           }
//           column.width = calculatedWidth;
//         });
//       } else {
//         worksheet.columns.forEach((column) => {
//           const headerLength = column.header?.length || 0;
//           let calculatedWidth: number;
//           if (headerLength < 8) {
//             calculatedWidth = 8;
//           } else if (headerLength > 50) {
//             calculatedWidth = 50;
//           } else {
//             calculatedWidth = headerLength + 2;
//           }
//           column.width = calculatedWidth;
//         });
//       }

//       // Set header row height
//       if (headerHeight > 0) {
//         const headerRow = worksheet.getRow(1);
//         headerRow.height = headerHeight;
//       }
//     });
//     const buffer = await workbook.xlsx.writeBuffer();
//     const data = new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     FileSaver.saveAs(data, `${fileName}${fileExtension}`);
//   } catch (error) {
//     console.error("Error creating Excel file:", error);
//     throw error;
//   }
// };

// export const downloadFileBlob = (blob: Blob, fileName: string) => {
//   const link = document.createElement("a");
//   const href = URL.createObjectURL(blob);

//   link.href = href;
//   link.setAttribute("download", fileName);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(href);
// };

// export const downloadFileFromUrL = async (urlFile: string, fileName: string = "file.txt") => {
//   const response = await fetch(urlFile);
//   const blob = await response.blob();

//   const fileNameInfo = urlFile.split("/").pop() || fileName;
//   downloadFileBlob(blob, fileNameInfo);
// };

// export const getNumberValue = (value: string | number | null | undefined) => {
//   const numberValue = Number(value);
//   const result = isNaN(numberValue) ? value : numberValue;
//   return result as any;
// };
