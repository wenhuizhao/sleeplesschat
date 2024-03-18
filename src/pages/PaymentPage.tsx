import '../styles/PaymentPage.css';

import { Elements } from '@stripe/react-stripe-js';
import type { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import CheckoutForm from './CheckoutForm';

// export const PUBLISHABLE_KEY = 'pk_live_51OuRbs07NdmpHOyl8aoE7xxq3kPvP1Ly9QKLB8hiBBNaEX8o5RvUxowzezOvnYphov2OfMYuJgc5SnLS7Eo0kJ5s006rJ7Al43'
export const PUBLISHABLE_KEY =
  'pk_test_51OuRbs07NdmpHOyl9GKwzYT7Z8P7IzO6xBXC665EgDmVADTMDzgQXCY5h0NApiRu8PzJ6CgCe7zs3nHK4bOAFQ0400clapf2df';

export default function PaymentPage() {
  const [stripePromise] = useState(() => loadStripe(PUBLISHABLE_KEY));

  // const loadData = async () => {
  //   // Send a post request to flask to the route /create-payment-intent
  //   // Add a payload to the request like this:
  //   //{
  //   //items: [{ id: "Premium" }],
  //   //customer: user_uuid
  //   //}
  //   // I am providing a user_uuid, so I can identify who is making the payment later
  //   // Set client secret like this setClientSecret(response.clientSecret);

  //   const res = await api.post(`${BACKEND_URL}/create-payment-intent`, { amount: 500, customer: 123 })
  //   console.log("response", res)
  //   setClientSecret(res.data.clientSecret)
  // }

  // useEffect(() => {
  //   if (!initialized.current) {
  //     initialized.current = true

  //    // loadData();
  //   }
  // }, [])

  const appearance: Appearance = {
    theme: 'stripe',
  };

  const amount = 500;
  const options: StripeElementsOptions = {
    appearance,
    mode: 'payment',
    amount,
    currency: 'usd',
  };

  return (
    <Main meta={<Meta title="Payment" description="Payment" />}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    </Main>
  );
}
