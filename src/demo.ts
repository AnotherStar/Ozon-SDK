import { Ozon } from './index.js';
import { config } from 'dotenv';
config();

import { writeFileSync } from 'fs';
const { OZON_CLIENT_ID, OZON_API_KEY } = process.env;

if (!OZON_CLIENT_ID) throw 'OZON_CLIENT_ID not provided';
if (!OZON_API_KEY) throw 'OZON_API_KEY not provided';

const ozon = new Ozon(OZON_CLIENT_ID, OZON_API_KEY);

try {
    // ozon.getProductInfo({
    //     offer_id: '104401EE',
    // }).then(data => {
    //     console.log(data);
    // });

    ozon.getPostingFbo('72471194-0001-1', {
        with: {
            financial_data: true,
        },
    }).then(posting => {
        console.log(JSON.stringify(posting, null, '  '));
    });

    // ozon.getFinanceTransactions({
    //     filter: {
    //         posting_number: '72471194-0001-1',
    //     },
    //     page: 1,
    //     page_size: 1000,
    // }).then(data => {
    //     console.log(data);
    // });

    // ozon.getPostingsBetweenDates('2021-08-01T00:00:00.00Z', '2021-08-02T00:00:00.00Z')
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    /* ok
    
    await ozon.getReportFile('returns', {});
    
    await ozon.getReportFile('products', {});
    
    await ozon.getReportFile('stock', {});
    
    await ozon.getReportFile('finance', {
        date_from: '2000-01-01T00:00:00.00Z',
        date_to: '2021-09-01T00:00:00.00Z',
    });

    await ozon.getReportFile('transactions', {
        date_from: '2000-01-01T00:00:00.00Z',
        date_to: '2021-09-01T00:00:00.00Z',
    });
    
    ozon.getReportFile('products/movement', {
        date_from: '2000-01-01T00:00:00.00Z',
        date_to: '2021-09-01T00:00:00.00Z',
    });
    ozon.getReportFile('products/prices', {});

    */
    // const code = await ozon.createReportFinance({
    //     date_from: '',
    //     date_to: '',
    //     language: 'RU',
    // });

    // ozon.createReportPostings({
    //     // @ts-ignore
    //     filter: {
    //         processed_at_from: '2021-08-01T00:00:00.00Z',
    //         processed_at_to: '2021-09-01T00:00:00.00Z',
    //     },
    // }).then(data => {
    //     writeFileSync('ReportPostings', data);

    //     // @ts-ignore
    //     // console.log('stream', Object.keys(stream));
    //     // @ts-ignore
    //     // stream?.pipeTo(destination);
    // });

    // ozon.createReportTransactions({
    //     date_from: '2021-07-01T00:00:00.00Z',
    //     date_to: '2021-09-01T00:00:00.00Z',
    // }).then(data => {
    //     console.log('ReportTransactions data', data);
    //     writeFileSync('ReportTransactions', data);
    // });

    // console.log(code);
} catch (error) {
    console.log(error);
}
// const reportsList = await ozon.getReportList().then(data => data.reports);

// const report = await ozon.getReportInfo(reportsList[0].code).then(data => data);

// const file = await ozon.getReport(report.code);

// console.log(file);

// const report = await ozon.makeReportReturns();
// console.log(report);

// const reportInfo = await ozon.getReport('68c6b87b-c17f-474b-9574-e04989fa4ab2');
// console.log(reportInfo);

// console.log(
//     await ozon.getPostingFboList({
//         limit: 1,
//     }),
// );

// const posting = await ozon.getPostingFbo('52410287-0001-1', {
//     with: {
//         analytics_data: true,
//         financial_data: true,
//     },
// });

// console.log(JSON.stringify(posting.financial_data, null, '  '));
