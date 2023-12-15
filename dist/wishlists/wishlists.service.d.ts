import { PageOptionsDto } from 'src/common/dtos';
import { CreateApiResponse, ApiGetResponse } from 'src/common/interfaces';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';
import { Repository } from 'typeorm';
export declare class WishlistsService {
    private wishlistsRepository;
    private productsRepository;
    constructor(wishlistsRepository: Repository<Wishlist>, productsRepository: Repository<Product>);
    addToWishlist(user: User, productId: string): Promise<CreateApiResponse<any>>;
    getAllWishlist(user: User, pageOptionsDto: PageOptionsDto): Promise<ApiGetResponse<Wishlist>>;
    removeFromWishlist(id: string): Promise<CreateApiResponse<any>>;
}
