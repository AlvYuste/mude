import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { getOffsetFromTime } from '../../../utils/utils';

const ClipWrapper = styled.div`
  left: ${({ offset }) => `${offset}px`};
  width: ${({ width }) => `${width}px`};
  background-color: ${Colors.GRAY1};
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25) inset;
  border-radius: 0.25rem;
  position: absolute;
  height: calc(100% - 2px);
  margin: 1px 0;
`;

export const Clip = ({ startAt, endAt }) => {
  const duration = endAt - startAt;
  const offset = getOffsetFromTime(startAt);
  const width = getOffsetFromTime(duration);
  return <ClipWrapper offset={offset} width={width} />;
};

Clip.propTypes = {
  startAt: PropTypes.number.isRequired,
  endAt: PropTypes.number.isRequired,
};
