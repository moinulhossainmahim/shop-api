import { WishlistsService } from './wishlists.service';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';
import { CreateApiResponse, ApiGetResponse } from 'src/common/interfaces';
import { PageOptionsDto } from 'src/common/dtos';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    addToWishlist(user: User, id: string): Promise<CreateApiResponse<any>>;
    getWishlist(user: User, pageOptionsDto: PageOptionsDto): Promise<ApiGetResponse<Wishlist>>;
    removeFromWishlist(id: string): Promise<CreateApiResponse<any>>;
}
