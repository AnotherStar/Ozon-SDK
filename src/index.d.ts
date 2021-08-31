export {};

declare namespace NodeJS {
    interface ProcessEnv {
        OZON_CLIENT_ID: string;
        OZON_API_KEY: string;
    }
}

export declare namespace OzonTypes {
    type Language = 'RU' | 'EN';

    type CancelReasonId = 1;

    type Datetime = string;

    type ProductVisibility =
        /** все товары. */
        | 'ALL'
        /** видны покупателям. */
        | 'VISIBLE'
        /** не видны покупателям. */
        | 'INVISIBLE'
        /** нет в наличии. */
        | 'EMPTY_STOCK'
        /** не прошли модерацию. */
        | 'NOT_MODERATED'
        /** прошли модерацию. */
        | 'MODERATED'
        /** отключены. */
        | 'DISABLED'
        /** создание завершилось ошибкой. */
        | 'STATE_FAILED'
        /** готовы к поставке. */
        | 'READY_TO_SUPPLY'
        /** проходят проверку. */
        | 'VALIDATION_STATE_PENDING'
        /** не прошли проверку. */
        | 'VALIDATION_STATE_FAIL'
        /** прошли проверку. */
        | 'VALIDATION_STATE_SUCCESS'
        /** готовы к продаже. */
        | 'TO_SUPPLY'
        /** в продаже. */
        | 'IN_SALE'
        /** скрыты от покупателей. */
        | 'REMOVED_FROM_SALE'
        /** заблокированные. */
        | 'BANNED'
        /** цена выше рыночных. */
        | 'OVERPRICED'
        /** цена значительно выше рыночных. */
        | 'CRITICALLY_OVERPRICED'
        /** без штрихкода. */
        | 'EMPTY_BARCODE'
        /** со штрихкодом. */
        | 'BARCODE_EXISTS'
        /** на карантине. */
        | 'QUARANTINE';

    type TransactionType =
        /** все */
        | 'ALL'
        /** заказы */
        | 'ORDERS'
        /** возвраты */
        | 'RETURNS'
        /** сервисные сборы */
        | 'SERVICES'
        /** депозит */
        | 'DEPOSIT'
        /** другие */
        | 'OTHER';

    interface PostingAnalyticsData {
        region: string;
        city: string;
        delivery_type: 'PVZ';
        is_premium: boolean;
        payment_type_group_name: 'Карты оплаты';
        warehouse_id: number;
        warehouse_name: string;
        is_legal: boolean;
    }

    interface PostingFinancialDataProduct {
        commission_amount: number;
        commission_percent: number;
        payout: number;
        product_id: number;
        old_price: number;
        price: number;
        total_discount_value: number;
        total_discount_percent: number;
        actions: string[];
        picking: null;
        quantity: number;
        client_price: '';
        item_services: {
            marketplace_service_item_fulfillment: number;
            marketplace_service_item_pickup: number;
            marketplace_service_item_dropoff_pvz: number;
            marketplace_service_item_dropoff_sc: number;
            marketplace_service_item_dropoff_ff: number;
            marketplace_service_item_direct_flow_trans: number;
            marketplace_service_item_return_flow_trans: number;
            marketplace_service_item_deliv_to_customer: number;
            marketplace_service_item_return_not_deliv_to_customer: number;
            marketplace_service_item_return_part_goods_customer: number;
            marketplace_service_item_return_after_deliv_to_customer: number;
        };
    }

    interface PostingFinancialData {
        products: PostingFinancialDataProduct[];
        posting_services: {
            marketplace_service_item_fulfillment: number;
            marketplace_service_item_pickup: number;
            marketplace_service_item_dropoff_pvz: number;
            marketplace_service_item_dropoff_sc: number;
            marketplace_service_item_dropoff_ff: number;
            marketplace_service_item_direct_flow_trans: number;
            marketplace_service_item_return_flow_trans: number;
            marketplace_service_item_deliv_to_customer: number;
            marketplace_service_item_return_not_deliv_to_customer: number;
            marketplace_service_item_return_part_goods_customer: number;
            marketplace_service_item_return_after_deliv_to_customer: number;
        };
    }

    type PostingStatus =
        | 'awaiting_approve'
        | 'awaiting_packaging'
        | 'awaiting_deliver'
        | 'arbitration'
        | 'delivering'
        | 'delivered'
        | 'cancelled'
        | 'not_accepted'
        | 'driver_pickup';

    type SortDirection = 'asc' | 'desc';

    interface PostingProduct {
        sku: number;
        name: string;
        quantity: number;
        offer_id: number;
        price: number;
        digital_codes: never[];
    }

    interface Posting {
        order_id: number;
        order_number: string;
        posting_number: string;
        status: PostingStatus;
        cancel_reason_id: CancelReasonId;
        created_at: Datetime;
        in_process_at: Datetime;
        products: PostingProduct[];
        analytics_data: PostingAnalyticsData | null;
        financial_data: PostingFinancialDataProduct | null;
        additional_data: [];
    }

    namespace Request {
        interface WithParams {
            analytics_data?: boolean;
            financial_data?: boolean;
        }

        interface PostingFboList {
            dir?: SortDirection;
            filter?: {
                since?: Datetime;
                status?: PostingStatus;
                to?: Datetime;
            };
            limit: number;
            offset?: number;
            translit?: boolean;
            with?: WithParams;
        }

        interface PostingFbo {
            posting_number: string;
            with?: WithParams;
        }
    }

    namespace Response {
        interface PostingFboList {
            result: [
                {
                    additional_data: [
                        {
                            key: string;
                            value: string;
                        },
                    ];
                    analytics_data: {
                        city: string;
                        delivery_type: string;
                        is_legal: boolean;
                        is_premium: boolean;
                        payment_type_group_name: string;
                        region: string;
                        warehouse_id: 0;
                        warehouse_name: string;
                    };
                    cancel_reason_id: 0;
                    created_at: Datetime;
                    financial_data: {
                        posting_services: {
                            marketplace_service_item_deliv_to_customer: 0;
                            marketplace_service_item_direct_flow_trans: 0;
                            marketplace_service_item_dropoff_ff: 0;
                            marketplace_service_item_dropoff_pvz: 0;
                            marketplace_service_item_dropoff_sc: 0;
                            marketplace_service_item_fulfillment: 0;
                            marketplace_service_item_pickup: 0;
                            marketplace_service_item_return_after_deliv_to_customer: 0;
                            marketplace_service_item_return_flow_trans: 0;
                            marketplace_service_item_return_not_deliv_to_customer: 0;
                            marketplace_service_item_return_part_goods_customer: 0;
                        };
                        products: [
                            {
                                actions: [string];
                                client_price: string;
                                commission_amount: 0;
                                commission_percent: 0;
                                item_services: {
                                    marketplace_service_item_deliv_to_customer: 0;
                                    marketplace_service_item_direct_flow_trans: 0;
                                    marketplace_service_item_dropoff_ff: 0;
                                    marketplace_service_item_dropoff_pvz: 0;
                                    marketplace_service_item_dropoff_sc: 0;
                                    marketplace_service_item_fulfillment: 0;
                                    marketplace_service_item_pickup: 0;
                                    marketplace_service_item_return_after_deliv_to_customer: 0;
                                    marketplace_service_item_return_flow_trans: 0;
                                    marketplace_service_item_return_not_deliv_to_customer: 0;
                                    marketplace_service_item_return_part_goods_customer: 0;
                                };
                                old_price: 0;
                                payout: 0;
                                picking: {
                                    amount: 0;
                                    moment: Datetime;
                                    tag: string;
                                };
                                price: 0;
                                product_id: 0;
                                quantity: 0;
                                total_discount_percent: 0;
                                total_discount_value: 0;
                            },
                        ];
                    };
                    in_process_at: Datetime;
                    order_id: 0;
                    order_number: string;
                    posting_number: string;
                    products: [
                        {
                            name: string;
                            offer_id: string;
                            price: string;
                            quantity: 0;
                            sku: 0;
                        },
                    ];
                    status: PostingStatus;
                },
            ];
        }

        interface PostingFbo {
            result: Posting;
        }
    }

    namespace Report {
        type Type =
            /**  Все отчёты */
            | 'ALL'
            /**  Отчёт по товарам */
            | 'SELLER_PRODUCTS'
            /**  Отчёт по транзакциям */
            | 'SELLER_TRANSACTIONS'
            /**  Отчёт по ценам товаров */
            | 'SELLER_PRODUCT_PRICES'
            /**  Отчёт об остатках товаров */
            | 'SELLER_STOCK'
            /**  Отчёт о перемещении товаров */
            | 'SELLER_PRODUCT_MOVEMENT'
            /**  Отчёт о возвратах */
            | 'SELLER_RETURNS'
            /**  Отчёт об отправлениях */
            | 'SELLER_POSTINGS'
            /**  Отчёт о финансах */
            | 'SELLER_FINANCE';

        type Status = 'success';

        interface Info {
            code: string;
            status: Status;
            error: string;
            file: string;
            report_type: Type;
            params: {
                delivery_schema?: string;
                processed_at_from?: Datetime;
                processed_at_to?: Datetime;
            };
            created_at: Datetime;
        }
    }
}
