import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
  display: inline-block;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;