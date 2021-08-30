import { AxiosInstance } from 'axios';
import getInstance from './axios-instance.js';

export interface OzonSettings {
    baseURL?: string;
}

export default class Ozon {
    #apiKey: string;
    #clientId: string;
    #instance: AxiosInstance;
    baseURL: string = 'https://api-seller.ozon.ru';

    constructor(clientId: string, apiKey: string, settings?: OzonSettings) {
        this.#apiKey = apiKey;
        this.#clientId = clientId;
        this.#instance = getInstance({
            baseURL: (settings && settings.baseURL) || this.baseURL,
            apiKey: this.#apiKey,
            clientId: this.#clientId,
        });
    }

    getDocs() {
        return this.#instance.post('/docs').then(response => response.data);
    }

    getPostingFboList(settings: Ozon.Request.PostingFboList) {
        return this.#instance
            .post<Ozon.Response.PostingFboList>(`/v2/posting/fbo/list`, settings)
            .then(response => response.data.result);
    }

    getPostingFbo(
        postingNumber: string,
        settings?: {
            with: Ozon.Request.WithParams;
        },
    ) {
        const payload: {
            posting_number: string;
            with?: Ozon.Request.WithParams;
        } = {
            posting_number: postingNumber,
            ...settings,
        };

        return this.#instance
            .post(`/v2/posting/fbo/get`, payload)
            .then(response => response.data)
            .then(data => {
                return data.result as Ozon.Posting;
            });
    }

    getCategoriesTree() {
        return this.#instance.get(`/v1/categories/tree`).then(response => response.data);
    }

    getAnalyticsData() {
        return this.#instance.get(`/v1/analytics/data`).then(response => response.data);
    }
}
