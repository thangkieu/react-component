import { memo } from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  padding: 0.5rem 1rem;
`;

export const Header = memo(() => {
  return <HeaderStyle>React components</HeaderStyle>;
});
