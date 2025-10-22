'use server'

import { headers } from 'next/headers'
import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import Stripe from 'stripe';
import {redirect} from 'next/navigation'
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

export const checkoutOrder= async(order:CheckoutOrderParams)=>{
  const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('Stripe secret key is not defined in environment variables.');
}
const stripe = new Stripe(secretKey);

const price=order.isFree?0:Number(order.price)*100;
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data:{
            currency:'inr',
            unit_amount:price,
            product_data:{
              name:order.eventTitle,
            }
          },
          quantity:1
        },
      ],
      metadata:{
        eventId:order.eventId,
        buyerId:order.buyerId
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?canceled=true`,
    });
    redirect(session.url!)
  } catch (error) {
        throw error;
    }
}

export const createOrder=async(order:CreateOrderParams)=>{
  try {
    await connectToDatabase()

    const newOrder=await Order.create({
      ...order,
      event:order.eventId,
      buyer:order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));

  } catch (error) {
    handleError(error)
  }
}

//4.53.59