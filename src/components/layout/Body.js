import styled from '@emotion/styled';

export const Body = styled.div`
  height: ${({ hasHeaders }) =>
    hasHeaders ? `calc(100% - ${hasHeaders * 50}px)` : '100%'};
  overflow-x: hidden;
  overflow-y: auto;
`;
