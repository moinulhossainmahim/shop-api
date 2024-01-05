import { Cart } from 'src/entity/Cart';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart-dto';
import { ApiDeleteResponse, ApiGetResponse, CreateApiResponse } from 'src/common/interfaces';
export declare class CartService {
    private readonly cartRepository;
    private readonly userRepository;
    private readonly productRepository;
    constructor(cartRepository: Repository<Cart>, userRepository: Repository<User>, productRepository: Repository<Product>);
    addToCart(addToCartDto: AddToCartDto, user: User): Promise<CreateApiResponse<Omit<Cart, 'user'>>>;
    updateCart(user: User, productId: string, quantity: number): Promise<CreateApiResponse<Cart>>;
    getCartOfAUser(user: User): Promise<ApiGetResponse<Cart>>;
    deleteAllCartOfAUser(user: User): Promise<ApiDeleteResponse>;
    deleteCartByProductId(productId: string, user: User): Promise<ApiDeleteResponse>;
}
