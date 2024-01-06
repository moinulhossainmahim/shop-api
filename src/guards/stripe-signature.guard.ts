// stripe-signature.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

const configService = new ConfigService();

@Injectable()
export class StripeSignatureGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload = request.rawBody; // Use the raw body of the request
    const signature = request.headers['stripe-signature'];

    const endpointSecret = configService.get('STRIPE_WEBHOOK_SECRET'); // Use your Stripe webhook secret key

    const stripe = new Stripe('', { apiVersion: '2023-10-16' }); // Use your Stripe secret key
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret,
      );
      request.body = event; // Set the verified event as the request body
      return true;
    } catch (err) {
      return false;
    }
  }
}
