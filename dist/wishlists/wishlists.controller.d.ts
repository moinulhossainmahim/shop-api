import { WishlistsService } from './wishlists.service';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';
import { CreateApiResponse, ApiGetResponse } from 'src/common/interfaces';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    addToWishlist(user: User, id: string): Promise<CreateApiResponse<any>>;
    getWishlist(user: User): Promise<ApiGetResponse<Wishlist>>;
    removeFromWishlist(id: string): Promise<CreateApiResponse<any>>;
}
