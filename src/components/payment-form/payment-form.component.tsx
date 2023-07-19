import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

import { selectTotalPrice } from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/user/user.selectors';

import { BUTTON_TYPES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectTotalPrice);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(res => res.json());

    
    const { paymentIntent: { client_secret } } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest'
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(JSON.stringify(paymentResult.error));
      console.error(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful');
      }
    }
  };


  return (
    <PaymentFormContainer>
      <FormContainer aria-label='stripe-payment-form' onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES.inverted}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;