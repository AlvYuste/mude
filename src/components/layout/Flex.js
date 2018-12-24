import styled from '@emotion/styled';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  padding: ${({ spaced }) =>
    spaced === 'container' || spaced === true ? '1rem' : 'unset'};
  & > * + * {
    margin: ${({ spaced, direction }) =>
      spaced === 'items' || spaced === true
        ? (direction === 'column' && '1rem 0 0 0') || ' 0 0 0 1rem'
        : 'unset'};
  }
`;
