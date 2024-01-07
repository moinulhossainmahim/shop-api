import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateCheckoutSessionDto } from 'src/stripe/dto/create-checkout-session.dto';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    return await this.stripeService.createCheckoutSession(
      createCheckoutSessionDto,
    );
  }
}
