import { AxiosInstance } from 'axios';
import { OzonTypes } from './types.js';
import getInstance from './axios-instance.js';

import {
    getReportInfo,
    getReportContent,
    getReportList,
    createReportProducts,
    createReportTransactions,
    createReportProductsPrices,
    createReportStock,
    createReportProductsMovement,
    createReportReturns,
    createReportPostings,
    createReportFinance,
} from './reports.js';

interface OzonSettings {
    baseURL?: string;
}

export class Ozon {
    #apiKey: string;
    #clientId: string;
    instance: AxiosInstance;
    baseURL: string = 'https://api-seller.ozonTypes.ru';

    getReportInfo = getReportInfo;
    getReportContent = getReportContent;
    getReportList = getReportList;
    createReportProducts = createReportProducts;
    createReportTransactions = createReportTransactions;
    createReportProductsPrices = createReportProductsPrices;
    createReportStock = createReportStock;
    createReportProductsMovement = createReportProductsMovement;
    createReportReturns = createReportReturns;
    createReportPostings = createReportPostings;
    createReportFinance = createReportFinance;

    constructor(clientId: string, apiKey: string, settings?: OzonSettings) {
        this.#apiKey = apiKey;
        this.#clientId = clientId;
        this.instance = getInstance({
            baseURL: (settings && settings.baseURL) || this.baseURL,
            apiKey: this.#apiKey,
            clientId: this.#clientId,
        });
    }

    getDocs() {
        return this.instance.post('/docs').then(response => response.data);
    }

    getPostingFboList(settings: OzonTypes.Request.PostingFboList) {
        return this.instance
            .post<OzonTypes.Response.PostingFboList>(`/v2/posting/fbo/list`, settings)
            .then(response => response.data.result);
    }

    getPostingFbo(
        postingNumber: string,
        settings?: {
            with: OzonTypes.Request.WithParams;
        },
    ) {
        const payload: {
            posting_number: string;
            with?: OzonTypes.Request.WithParams;
        } = {
            posting_number: postingNumber,
            ...settings,
        };

        return this.instance
            .post(`/v2/posting/fbo/get`, payload)
            .then(response => response.data)
            .then(data => {
                return data.result as OzonTypes.Posting;
            });
    }

    getCategoriesTree() {
        return this.instance.get(`/v1/categories/tree`).then(response => response.data);
    }

    getAnalyticsData() {
        return this.instance.get(`/v1/analytics/data`).then(response => response.data);
    }
}
