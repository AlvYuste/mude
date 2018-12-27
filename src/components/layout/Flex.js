import styled from '@emotion/styled';
import { mq } from '../../utils/mq';

const spaceItems = distance => ({ spaced, direction }) =>
  spaced === 'items' || spaced === true
    ? (direction === 'column' && `${distance} 0 0 0`) || `0 0 0 ${distance}`
    : '';
const spaceContainer = distance => ({ spaced }) =>
  spaced === 'container' || spaced === true ? distance : '';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'unset'};
  justify-content: ${({ justify }) => justify || 'unset'};
  padding: ${spaceContainer('0.25rem')};
  ${mq.mobile} {
    padding: ${spaceContainer('0.5rem')};
  }
  ${mq.tablet} {
    padding: ${spaceContainer('1rem')};
  }
  & > * + * {
    margin: ${spaceItems('0.25rem')};
    ${mq.mobile} {
      margin: ${spaceItems('0.5rem')};
    }
    ${mq.tablet} {
      margin: ${spaceItems('1rem')};
    }
  }
`;
