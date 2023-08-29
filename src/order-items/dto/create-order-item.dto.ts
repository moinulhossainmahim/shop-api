export class CreateOrderItemDto {
  productId: string;
  orderId: string;
  quantity: number;
  unit_price: number;
}
