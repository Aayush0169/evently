import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions';

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    return new NextResponse('Webhook secret not found', { status: 500 });
  }

  let event: stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }


  const eventType = event.type;

//CREATE
  if (eventType === 'checkout.session.completed') {
    const {id, amount_total, metadata}=event.data.object

    const order={
        stripeId:id,
        eventId:metadata?.eventId|| '',
        buyerId:metadata?.buyerId|| '',
        totalAmount:amount_total?(amount_total/100).toString():'0',
        createdAt:new Date(),
    }

    const newOrder= await createOrder(order)
    return NextResponse.json({message:'OK', order:newOrder})

  }

  return new Response('Done', { status: 200 });
}