import { styled } from 'base-styled-ts';
import React from 'react';
import Button from '../Button/Button';

function App() {

  const Wrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    min-height: 100vh;
  `

  return (
    <Wrapper>
      <Button text='default' type='default'/>
      <Button text='shadow' type='shadow'/>
    </Wrapper>
  );
}

export default App;
