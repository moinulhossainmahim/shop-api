import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';
import { Repository } from 'typeorm';
export declare class WishlistsService {
    private wishlistsRepository;
    private productsRepository;
    constructor(wishlistsRepository: Repository<Wishlist>, productsRepository: Repository<Product>);
    addToWishlist(user: User, productId: string): Promise<CreateApiResponse<any>>;
    getAllWishlist(user: User): Promise<ApiGetResponse<Wishlist>>;
    removeFromWishlist(id: string): Promise<CreateApiResponse<any>>;
}
