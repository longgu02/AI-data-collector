const xlsx = require('xlsx');
const path = require('path');

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) =>{
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportResultToExcel = (result, workSheetColumnNames, workSheetName, filePath) => {
    const data = result.map((result) => {
        return [result.score, result.algorithm, result.maxDepth ,result.iterations, result.simulationDepth, result.maxTile]
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

const exportAllResultToExcel = (result, workSheetColumnNames, workSheetName, filePath) => {
    const data = result.map((result) => {
        return [result.score, result.algorithm, result.maxDepth ,result.iterations, result.simulationDepth, result.maxTile]
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

module.exports = {exportResultToExcel, exportAllResultToExcel};