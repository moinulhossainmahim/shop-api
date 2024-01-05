import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart-dto';
import { User } from 'src/entity/User';
import { ApiDeleteResponse, ApiGetResponse, CreateApiResponse } from 'src/common/interfaces';
import { Cart } from 'src/entity/Cart';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(addToCartDto: AddToCartDto, user: User): Promise<CreateApiResponse<Omit<Cart, 'user'>>>;
    getCartOfAUser(user: User): Promise<ApiGetResponse<Cart>>;
    updateCart(productId: string, user: User, quantity: number): Promise<CreateApiResponse<Cart>>;
    deleteAllCartOfAUser(user: User): Promise<ApiDeleteResponse>;
    deleteCartByProductId(productId: string, user: User): Promise<ApiDeleteResponse>;
}
