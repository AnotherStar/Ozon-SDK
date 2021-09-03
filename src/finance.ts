import { Ozon } from './index.js';
import { OzonTypes } from './types.js';

/* ----------------------------------------------- Список транзакций ------------------------------------------------ */

interface FinanceTransaction {}

interface getFinanceTransactionsRequest {
    filter: {
        date?: {
            from: OzonTypes.Datetime;
            to: OzonTypes.Datetime;
        };
        posting_number: string;
    };
    page: number;
    page_size: number;
}

interface getFinanceTransactionsResponse {
    result: {
        operations: FinanceTransaction[];
    };
}

const payloads = {
    filter: {
        date: {
            from: '2021-01-01T00:00:00.00Z',
            to: '2021-09-01T00:00:00.00Z',
        },
        // operation_type: ['string'],
        posting_number: '72471194-0001-1',
        transaction_type: 'all',
    },
    page: 0,
    page_size: 10,
};

export function getFinanceTransactions(this: Ozon, payload: getFinanceTransactionsRequest) {
    return this.instance
        .post<getFinanceTransactionsResponse>(`/v3/finance/transaction/list`, payload)
        .then(response => response.data.result);
}
