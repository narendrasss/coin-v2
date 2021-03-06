import React from 'react';
import styled from 'styled-components';
import { ArrowBack } from 'styled-icons/boxicons-regular';

function BackButton({ className, children }) {
  return (
    <Back onClick={() => window.history.back()} className={className}>
      <ArrowBack size="1em" />
      <p>{children}</p>
    </Back>
  );
}

export default BackButton;

const Back = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.dark};
  font-size: 1.2em;
  p {
    margin-left: 1em;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
  margin-bottom: 1em;
  cursor: pointer;
`;
