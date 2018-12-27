import React from 'react';
import PropTypes from 'prop-types';

import { Slider, Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';

const SliderStyled = styled(Slider)`
  min-width: 0;
  .${Classes.SLIDER_HANDLE} {
    .${Classes.SLIDER_LABEL} {
      display: none;
    }
    &.${Classes.ACTIVE} .${Classes.SLIDER_LABEL} {
      display: inline-block;
    }
  }
  .${Classes.SLIDER_LABEL} {
    opacity: 0.5;
    transform: translate(-50%, 1rem);
  }
`;
export const SimpleSlider = ({
  min,
  max,
  minLabel,
  middleLabel,
  maxLabel,
  ...rest
}) => (
  <SliderStyled
    {...rest}
    min={min}
    max={max}
    labelStepSize={(max - min) / 2}
    stepSize={(max - min) / 20}
    labelRenderer={value =>
      (value === min && (minLabel || `${min}`)) ||
      (value === (min + max) / 2 && (middleLabel || '|')) ||
      (value === max && (maxLabel || `${max}`)) ||
      value
    }
  />
);

SimpleSlider.propTypes = {
  ...Slider.propTypes,
  minLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  middleLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  maxLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};
SimpleSlider.defaultProps = {
  ...Slider.defaultProps,
  minLabel: undefined,
  middleLabel: undefined,
  maxLabel: undefined,
};
