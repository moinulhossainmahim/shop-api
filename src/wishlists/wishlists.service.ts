import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { CreateApiResponse, ApiGetResponse } from 'src/common/interfaces';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Wishlist } from 'src/entity/Wishlist';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async addToWishlist(
    user: User,
    productId: string,
  ): Promise<CreateApiResponse<any>> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const wishlistItem = this.wishlistsRepository.create({
      product,
      user,
    });
    try {
      const wishlist = await this.wishlistsRepository.save(wishlistItem);
      if (wishlist) {
        return {
          message: 'Added to wishlist successfully',
          data: [],
          success: true,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllWishlist(
    user: User,
    pageOptionsDto: PageOptionsDto,
  ): Promise<ApiGetResponse<Wishlist>> {
    const wishlists = await this.wishlistsRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_wishlist, itemCount] = await this.wishlistsRepository.findAndCount({
      where: { user: { id: user.id } },
    });

    const meta = new PageMetaDto({ itemCount, pageOptionsDto });
    return {
      success: true,
      data: wishlists,
      meta,
      message: 'Fetched wishlists successfully',
    };
  }

  async removeFromWishlist(id: string): Promise<CreateApiResponse<any>> {
    const wishlist = await this.wishlistsRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    const result = await this.wishlistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    return {
      success: true,
      data: [],
      message: 'Wishlist removed successfully',
    };
  }
}
