import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [PaymentController],
})
export class PaymentModule {}
