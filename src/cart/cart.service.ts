import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        total: Number(product.price) * Number(quantity),
        quantity,
      });
      newItem.user = authUser;
      newItem.item = product;
      await this.cartRepository.save(newItem);

      const cartItem = await this.cartRepository.save(newItem);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...cart } = cartItem;
      return cart;
    } else {
      const total = Number(cart[0].item.price) * Number(quantity);
      const result = await this.cartRepository.update(cart[0].id, {
        quantity,
        total,
      });

      if (result.affected == 1) {
        const cart = await this.cartRepository.find({
          where: { user: { id: user.id } },
          relations: ['item'],
        });
        const newCart = cart.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { user, ...cartItems } = item;
          return cartItems;
        });
        return newCart;
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

  async findCartById(id: string, user: User) {
    const found = await this.cartRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (found.user.id !== user.id) {
      throw new BadRequestException('Invalid user');
    }
    if (!found) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return found;
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
