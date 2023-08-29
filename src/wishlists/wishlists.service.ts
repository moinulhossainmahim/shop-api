import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async addToWishlist(user: User, productId: string) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const wishlistItem = this.wishlistsRepository.create({
      product,
      user,
    });
    return await this.wishlistsRepository.save(wishlistItem);
  }

  async getWishlist(user: User): Promise<Wishlist[]> {
    return await this.wishlistsRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
    });
  }

  async removeFromWishlist(id: string): Promise<void> {
    const result = await this.wishlistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
  }
}
