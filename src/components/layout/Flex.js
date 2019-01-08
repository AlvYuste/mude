import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mq } from '../../utils/mq';

const spaceItems = distance => ({ spaced, direction }) =>
  spaced === 'items' || spaced === true
    ? css`
        margin: ${direction === 'column'
          ? `${distance} 0 0 0`
          : `0 0 0 ${distance}`};
      `
    : '';
const spaceContainer = distance => ({ spaced }) =>
  spaced === 'container' || spaced === true
    ? css`
        padding: ${distance};
      `
    : '';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'unset'};
  justify-content: ${({ justify }) => justify || 'unset'};

  ${spaceContainer('1rem')}
  & > * + * {
    ${spaceItems('1rem')};
  }
`;

export const FlexResponsive = styled(Flex)`
  ${spaceContainer('0.5rem')}
  ${mq.fromTablet} {
    ${spaceContainer('1rem')}
  }
  & > * + * {
    ${spaceItems('0.5rem')};
    ${mq.fromTablet} {
      ${spaceItems('1rem')};
    }
  }
`;
