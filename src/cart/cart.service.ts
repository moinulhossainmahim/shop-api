import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/Cart.entity';
import { Product } from 'src/entity/Product.entity';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart.dto';
import {
  ApiDeleteResponse,
  ApiGetResponse,
  CreateApiResponse,
} from 'src/common/interfaces';

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

  async addToCart(
    addToCartDto: AddToCartDto,
    user: User,
  ): Promise<CreateApiResponse<Omit<Cart, 'user'>>> {
    const { productId, quantity } = addToCartDto;
    const cartItems = await this.cartRepository.find({
      relations: ['product', 'user'],
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
      (item) => item.product.id === productId && item.user.id === user.id,
    );
    if (cart.length < 1) {
      const newItem = this.cartRepository.create({
        total: Number(product.salePrice) * Number(quantity),
        quantity,
      });
      newItem.user = authUser;
      newItem.product = product;
      newItem.productId = productId;
      const cartItem = await this.cartRepository.save(newItem);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...cart } = cartItem;
      return {
        message: 'Add product to cart successfully',
        success: true,
        data: cart,
      };
    }
  }

  async updateCart(
    user: User,
    productId: string,
    quantity: number,
  ): Promise<CreateApiResponse<Cart>> {
    const found = await this.cartRepository.findOne({
      where: { productId, user: { id: user.id } },
      relations: ['product'],
    });
    if (found) {
      const total = Number(found.product.salePrice) * quantity;
      try {
        const result = await this.cartRepository.update(
          { productId },
          {
            quantity,
            total,
          },
        );
        if (result.affected === 1) {
          const cart = await this.cartRepository.findOne({
            where: { productId },
            relations: ['product'],
          });
          return {
            message: 'Cart updated successfully',
            data: cart,
            success: true,
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getCartOfAUser(user: User): Promise<ApiGetResponse<Cart>> {
    const cart = await this.cartRepository.find({
      relations: ['product'],
      where: { user: { id: user.id } },
    });
    return {
      message: 'Fetched cart successfully',
      success: true,
      data: cart,
    };
  }

  async deleteAllCartOfAUser(user: User): Promise<ApiDeleteResponse> {
    let isSuccess = true;
    const carts = await this.getCartOfAUser(user);
    if (carts.data.length) {
      carts.data.forEach(async (cart) => {
        const result = await this.cartRepository.delete(cart.id);
        if (result.affected === 0) isSuccess = false;
      });
      if (isSuccess) {
        return {
          message: 'Cart removed successfully',
          success: true,
          data: [],
        };
      }
    } else {
      return {
        message: 'Empty cart list',
        success: false,
        data: [],
      };
    }
  }

  async deleteCartByProductId(
    productId: string,
    user: User,
  ): Promise<ApiDeleteResponse> {
    const found = await this.cartRepository.findOne({
      where: { productId, user: { id: user.id } },
    });
    if (found) {
      const result = await this.cartRepository.delete({ productId });
      if (result.affected === 1) {
        return {
          message: 'Removed product from cart successfully',
          data: [],
          success: true,
        };
      } else {
        return {
          message: `Product with ID - ${productId} not found`,
          data: [],
          success: false,
        };
      }
    } else {
      return {
        message: `Cart item with product ID - ${productId} and the user not found`,
        data: [],
        success: false,
      };
    }
  }
}
