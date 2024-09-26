import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import successAnimation from './success-animation.json'; // Asegúrate de tener tu archivo de animación JSON
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: ${({ bgColor }) => bgColor || '#f9fafb'};
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Message = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-top: 1.5rem;
  text-align: center;
`;

const PMessage = styled.p`
  font-size: 1rem; // Cambiado a 1rem para un estilo más apropiado
  font-weight: 400; // Ajustado para que se vea más ligero
  color: #4a5568;
  margin-top: 1rem; // Ajustado para un espaciado consistente
  text-align: center; // Asegúrate de que esté centrado
`;

const PaymentConfirmation = ({ bgColor, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://www.netflix.com';
    }, 5000);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <Container bgColor={bgColor}>
      <Lottie animationData={successAnimation} loop={false} style={{ width: '200px', height: 'auto' }} />
      <Message>{message || "¡Pago realizado con éxito!"}</Message>
      <PMessage>{message || "En breves segundos serás redirigido para que puedas disfrutar lo que Netflix tiene para ti."}</PMessage>
    </Container>
  );
};

export default PaymentConfirmation;
