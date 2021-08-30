import Ozon from './index.js';

import { config } from 'dotenv';
config();

const ozon = new Ozon(process.env.OZON_CLIENT_ID, process.env.OZON_API_KEY);

// console.log(await ozon.getDocs());

// console.log(
//     await ozon.getPostingFboList({
//         limit: 1,
//     }),
// );

const posting = await ozon.getPostingFbo('52410287-0001-1', {
    with: {
        analytics_data: true,
        financial_data: true,
    },
});

console.log(JSON.stringify(posting.financial_data, null, '  '));
