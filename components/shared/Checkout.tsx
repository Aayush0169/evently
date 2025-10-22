import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { IEvent } from '@/lib/database/models/event.model'

import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error("Stripe publishable key is not set in .env.local");
}

const stripePromise = loadStripe(stripePublishableKey);
const Checkout = ({event,userId}:{event:IEvent,userId:string}) => {

  useEffect(()=>{
    const query= new URLSearchParams(window.location.search);
    if(query.get('success')){
      console.log('Order placed! You will receive an confirmation email')
    }

    if(query.get('canceled')){
      console.log('Order canceled !')
    }
  },[]);


    const onCheckout=async()=>{
      const order={
        eventTitle:event.title,
        eventId:event._id,
        price:event.price,
        isFree:event.isFree,
        buyerId:userId
      }
      await checkoutOrder(order);
    }
  
  return (
    <form action={onCheckout} >
      <Button type='submit' role='link' size='sm' className='button sm:w-fit  text-cyan-400'>
        {event.isFree?'Get Ticket':'Buy Ticket'}
      </Button>
    </form>
  )
}

export default Checkout
//4.47.10