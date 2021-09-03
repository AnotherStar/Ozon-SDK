import { Ozon } from './index.js';
import { OzonTypes } from './types.js';

/* ----------------------------------------- ПОЛУЧЕНИЕ ИНФОРМАЦИИ ПО ОТЧЕТУ ----------------------------------------- */

type ProductInfoRequest =
    | {
          offer_id: string;
      }
    | {
          product_id: number;
      }
    | {
          sku: number;
      };

interface ProductInfoResponse {
    result: OzonTypes.PostingProduct;
}

export function getProductInfo(this: Ozon, payload: ProductInfoRequest): Promise<OzonTypes.PostingProduct> {
    return this.instance.post<ProductInfoResponse>(`/v1/product/info`, payload).then(response => response.data.result);
}
