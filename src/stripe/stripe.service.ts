import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product';
import { Repository } from 'typeorm';

const configService = new ConfigService();

@Injectable()
export class StripeService {
  readonly stripe: Stripe;
  @InjectRepository(Product)
  private readonly productsRepository: Repository<Product>;

  constructor() {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async getLineItems(createCheckoutSessionDto: CreateCheckoutSessionDto) {
    const items = await Promise.all(
      createCheckoutSessionDto.items.map(async (item) => {
        const storeItem = await this.productsRepository.findOne({
          where: { id: item.productId },
        });
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: Math.round(storeItem.salePrice) * 100,
          },
          quantity: item.quantity,
        };
      }),
    );
    return items;
  }

  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: await this.getLineItems(createCheckoutSessionDto),
      });
      return {
        url: session.url,
        payment_status: session.payment_status,
      };
    } catch (error) {
      console.log('error');
    }
  }
}
