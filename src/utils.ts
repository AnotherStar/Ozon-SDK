export const CsvToArray = (reportData: string) => {
    const reportRows = reportData.split('\n').map(x => x.split(';'));
    const head = reportRows.shift();
    if (!head) throw '';

    const report: {
        [key: string]: any;
    } = [];

    reportRows.forEach(row => {
        const reportRow = {};
        head.forEach((key, index) => {
            reportRow[key] = row[index];
        });
        report.push(reportRow);
    });
};

import xlsx from 'xlsx';

export const XlsToArray = buffer => {
    const workbook = xlsx.read(buffer, {
        type: 'buffer',
    });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const head = xlsx.utils.sheet_to_json(sheet, {
        range: 'A1:Z5',
    });

    const body = xlsx.utils.sheet_to_json(sheet, {
        range: 'A6:Z9999',
    });

    return { head, body };
};
