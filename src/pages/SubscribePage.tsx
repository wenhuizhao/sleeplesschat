import '../styles/PaymentPage.css';

import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import type { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import api from '@/services/api';
import { Main } from '@/templates/Main';

import { Env } from '../libs/Env.mjs';

const BACKEND_URL = Env.NEXT_PUBLIC_BACKEND_URL;

// export const PUBLISHABLE_KEY = 'pk_live_51OuRbs07NdmpHOyl8aoE7xxq3kPvP1Ly9QKLB8hiBBNaEX8o5RvUxowzezOvnYphov2OfMYuJgc5SnLS7Eo0kJ5s006rJ7Al43'
export const PUBLISHABLE_KEY =
  'pk_test_51OuRbs07NdmpHOyl9GKwzYT7Z8P7IzO6xBXC665EgDmVADTMDzgQXCY5h0NApiRu8PzJ6CgCe7zs3nHK4bOAFQ0400clapf2df';

export default function PaymentPage() {
  const [stripePromise] = useState(() => loadStripe(PUBLISHABLE_KEY));
  const [clientSecret, setClientSecret] = useState();
  const [subscriptionId, setSubscriptionId] = useState();

  const prepareSubscription = async () => {
    // Send a post request to flask to the route /create-payment-intent
    // Add a payload to the request like this:
    // {
    // items: [{ id: "Premium" }],
    // customer: user_uuid
    // }
    // I am providing a user_uuid, so I can identify who is making the payment later
    // Set client secret like this setClientSecret(response.clientSecret);

    const res = await api.post(`${BACKEND_URL}/prepare-subscription`);
    console.log('response', res);

    setClientSecret(res.data.clientSecret);
    setSubscriptionId(res.data.subscriptionId);
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      prepareSubscription();
    }
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',
  };

  // const amount = 500;
  const options: StripeElementsOptions = {
    appearance,
    // mode: 'payment',
    // amount,
    // currency: 'usd',
    clientSecret,
  };

  console.log('subscription', subscriptionId);

  return (
    <Main meta={<Meta title="Payment" description="Payment" />}>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentElement />
        </Elements>
      )}
    </Main>
  );
}
