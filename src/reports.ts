import { Ozon } from './index.js';
import { OzonTypes } from './types.js';

interface CreateReportResponse {
    result: {
        code: string;
    };
}

/* ----------------------------------------- ПОЛУЧЕНИЕ ИНФОРМАЦИИ ПО ОТЧЕТУ ----------------------------------------- */

interface ReportInfoResponse {
    result: OzonTypes.Report.Info;
}
export function getReportInfo(this: Ozon, code: string) {
    return this.instance.post<ReportInfoResponse>(`/v1/report/info`, { code }).then(response => response.data.result);
}

/* --------------------------------------------- ПОЛУЧИТЬ КОНТЕНТ ОТЧЕТА -------------------------------------------- */

export async function getReportContent(this: Ozon, code: string, delay: number = 3000) {
    const reportInfo = await this.getReportInfo(code);

    if (reportInfo.status == 'success')
        return this.instance
            .get<ReadableStream>(reportInfo.file, { responseType: 'stream' })
            .then(response => response.data);

    setTimeout(() => {
        return this.getReportContent(code, delay);
    }, delay);
}

/* ------------------------------------------------- СПИСОК ОТЧЕТОВ ------------------------------------------------- */

interface GetReportListRequest {
    page: number;
    page_size: number;
    report_type: OzonTypes.Report.Type;
}

export function getReportList(this: Ozon, payload: GetReportListRequest) {
    return this.instance
        .post<ReportInfoResponse>(`/v1/report/list`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ------------------------------------------------ ОТЧЕТ ПО ТОВАРАМ ------------------------------------------------ */

interface CreateReportProductsRequest {
    offer_id: string[];
    search: string;
    sku: number[];
    visibility: OzonTypes.ProductVisibility;
    language: OzonTypes.Language;
}

export function createReportProducts(this: Ozon, payload: CreateReportProductsRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/products/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ---------------------------------------------- ОТЧЁТ ПО ТРАНЗАКЦИЯМ ---------------------------------------------- */

interface CreateReportTransactionsRequest {
    date_from: OzonTypes.Datetime;
    date_to: OzonTypes.Datetime;
    language: OzonTypes.Language;
    search: string;
    transaction_type: OzonTypes.TransactionType;
}

export function createReportTransactions(this: Ozon, payload: CreateReportTransactionsRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/transactions/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ------------------------------------------------- ОТЧЁТ ПО ЦЕНАМ ------------------------------------------------- */

interface CreateReportProductsPricesRequest {
    offer_id: string[];
    search: string;
    sku: number[];
    visibility: OzonTypes.ProductVisibility;
    language: OzonTypes.Language;
}

export function createReportProductsPrices(this: Ozon, payload: CreateReportProductsPricesRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/products/prices/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ------------------------------------------------ ОТЧЕТ ОБ ОСТАТКАХ ----------------------------------------------- */

interface CreateReportStockRequest {
    language: OzonTypes.Language;
}

export function createReportStock(this: Ozon, payload: CreateReportStockRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/stock/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ------------------------------------------- ОТЧЁТ О ПЕРЕМЕЩЕНИИ ТОВАРОВ ------------------------------------------ */

interface CreateReportProductsMovementRequest {
    date_from: OzonTypes.Datetime;
    date_to: OzonTypes.Datetime;
    language: OzonTypes.Language;
}

export function createReportProductsMovement(this: Ozon, payload: CreateReportProductsMovementRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/products/movement/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ------------------------------------------------ ОТЧЁТ О ВОЗВРАТАХ ----------------------------------------------- */

interface CreateReportReturnsRequest {
    filter: {
        delivery_schema: string;
        order_id: string;
        status: string;
    };
    language: OzonTypes.Language;
}

export function createReportReturns(this: Ozon, payload: CreateReportReturnsRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/returns/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ---------------------------------------------- ОТЧЕТ ПО ОТПРАВЛЕНИЯМ --------------------------------------------- */

interface CreateReportPostingsRequest {
    filter: {
        cancel_reason_id: number[];
        delivery_schema: string[];
        offer_id: string;
        processed_at_from: OzonTypes.Datetime;
        processed_at_to: OzonTypes.Datetime;
        sku: [];
        status_alias: [];
        statuses: [];
        title: string;
    };
    language: OzonTypes.Language;
}

export function createReportPostings(this: Ozon, payload: CreateReportPostingsRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/postings/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}

/* ------------------------------------------------ ОТЧЁТ О ФИНАНСАХ ------------------------------------------------ */

interface CreateReportFinanceRequest {
    date_from: OzonTypes.Datetime;
    date_to: OzonTypes.Datetime;
    language: OzonTypes.Language;
}

export function createReportFinance(this: Ozon, payload: CreateReportFinanceRequest) {
    return this.instance
        .post<CreateReportResponse>(`/v1/report/finance/create`, payload)
        .then(response => response.data.result.code)
        .then(this.getReportContent);
}
