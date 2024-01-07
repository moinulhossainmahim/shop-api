import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

const configService = new ConfigService();

@Injectable()
export class StripeService {
  readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  
}
