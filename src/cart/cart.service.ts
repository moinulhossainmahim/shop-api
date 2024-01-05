import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/Cart';
import { Product } from 'src/entity/Product';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart-dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findCartById(id: string, user: User) {
    const found = await this.cartRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['item'],
    });
    if (!found) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return found;
  }

  async addToCart(addToCartDto: AddToCartDto, user: User): Promise<any> {
    const { productId, quantity } = addToCartDto;
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const authUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!product) {
      throw new NotFoundException('Product item not found');
    }
    const cart = cartItems.filter(
      (item) => item.item.id === productId && item.user.id === user.id,
    );
    if (cart.length < 1) {
      const newItem = this.cartRepository.create({
        total: Number(product.salePrice) * Number(quantity),
        quantity,
      });
      newItem.user = authUser;
      newItem.item = product;
      const cartItem = await this.cartRepository.save(newItem);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...cart } = cartItem;
      return cart;
    }
  }

  async updateCart(user: User, id: string, quantity: number) {
    const found = await this.findCartById(id, user);
    if (found) {
      const total = Number(found.item.salePrice) * quantity;
      // console.log(total);
      // const result = await this.cartRepository.update(found.id, {
      //   quantity: Number(quantity),
      //   total,
      // });
      const result = await this.cartRepository.update(id, {
        quantity,
        total,
      });
      if (result.affected === 1) {
        console.log('updated');
      }
    }
  }

  async getCartOfAUser(user: User) {
    const cart = await this.cartRepository.find({
      relations: ['item'],
      where: { user: { id: user.id } },
    });
    return cart;
  }

  async getAllCarts() {
    return await this.cartRepository.find({ relations: ['item'] });
  }

  async deleteCartById(id: string, user: User) {
    const found = await this.findCartById(id, user);
    if (found) {
      const result = await this.cartRepository.delete({ id });
      if (result.affected === 1) {
        return 'Cart item deleted successfully';
      }
    }
  }
}
