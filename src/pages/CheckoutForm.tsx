import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

import api from '@/services/api';

import { Env } from '../libs/Env.mjs';

const BACKEND_URL = Env.NEXT_PUBLIC_BACKEND_URL;

type Props = {
  amount: Number;
};

export default function CheckoutForm(props: Props) {
  const stripe = useStripe();
  // const stripe = new Stripe(PUBLISHABLE_KEY)
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<String | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   console.log("checkoutForm clientSecret:", clientSecret);
  //   if (!clientSecret) {
  //   return;
  //   }

  //   // stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
  //   //   switch (paymentIntent?.status) {
  //   //     case "succeeded":
  //   //       setMessage("Payment succeeded!");
  //   //       break;
  //   //     case "processing":
  //   //       setMessage("Your Payment is processing.")
  //   //       break;
  //   //     case "requires_payment_method":
  //   //       setMessage("Your payment was not successful, please try again.");
  //   //       break;
  //   //     default:
  //   //       setMessage("Something went wrong.")
  //   //       break;
  //   //   }
  //   // });
  // }, [stripe]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      setMessage(submitError.message);
      return;
    }

    const res = await api.post(`${BACKEND_URL}/create-payment-intent`, {
      amount: props.amount,
      customer: 123,
    });
    console.log('create payment intent response', res);

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: res.data.clientSecret,
      confirmParams: {
        return_url: `${Env.NEXT_PUBLIC_FRONTEND_URL}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e: any) => setEmail(e.target.value)}
      /> */}
      <div>
        <label htmlFor="email-input" className="text-base text-gray-700">
          Email
          <div>
            <input
              className="my-5 mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </label>
      </div>
      <PaymentElement id="payment_element" options={paymentElementOptions} />
      <button
        className="my-5 rounded bg-blue-500 px-5 py-2  font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
