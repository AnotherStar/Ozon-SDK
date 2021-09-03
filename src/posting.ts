import { Ozon } from './index.js';
import { OzonTypes } from './types.js';

/* -------------------------------------------- ПОЛУЧЕНИЕ СПИСКА ЗАКАЗОВ -------------------------------------------- */

interface getPostingListRequest {
    dir?: OzonTypes.SortDirection;
    filter?: {
        since?: OzonTypes.Datetime;
        to?: OzonTypes.Datetime;
        status?: OzonTypes.PostingStatus;
    };
    limit: number;
    offset?: number;
    translit?: boolean;
    with?: OzonTypes.Request.WithParams;
}

interface getPostingListResponse {
    result: OzonTypes.Posting[];
}

export function getPostingsList(this: Ozon, payload: getPostingListRequest) {
    return this.instance
        .post<getPostingListResponse>(`/v2/posting/fbo/list`, payload)
        .then(response => response.data.result);
}

/* ------------------------------------------------ ПОЛУЧЕНИЕ ЗАКАЗА ------------------------------------------------ */

interface getPostingListResponse {
    result: OzonTypes.Posting[];
}

export function getPosting(this: Ozon, postingNumber: string, withData: OzonTypes.Request.WithParams) {
    return this.instance
        .post<getPostingListResponse>(`/v2/posting/fbo/get`, { posting_number: postingNumber, with: withData })
        .then(response => response.data.result);
}

export async function getPostingsBetweenDates(
    this: Ozon,
    since: OzonTypes.Datetime,
    to: OzonTypes.Datetime,
    withData?: OzonTypes.Request.WithParams,
) {
    let i = 10;
    const postings: OzonTypes.Posting[] = [];
    let limit = 50;
    let offset = 0;
    let isComplete = false;

    while (!isComplete) {
        const chunk = await this.getPostingsList({
            filter: {
                since,
                to,
            },
            limit: 50,
            offset,
            with: withData,
        });
        postings.push(...chunk);
        offset += limit;
        isComplete = chunk.length < limit;
    }

    return postings;
}
