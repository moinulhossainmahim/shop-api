import { Order } from '../enums/order.enum';
export declare class PageOptionsDto {
    readonly order?: Order;
    readonly page?: number;
    readonly take?: number;
    get skip(): number;
}
