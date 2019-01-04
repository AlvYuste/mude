import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';

export const CustomScroll = styled.div`
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }
  &::-webkit-scrollbar-button:single-button {
    display: block;
    background: ${Colors.DARK_GRAY2};
    color: white;
    border-style: solid;
    height: 1rem;
    width: 1rem;
    border-width: 0.5rem;
    border-color: transparent;

    &:horizontal {
      &:increment {
        border-right-width: 0;
        border-left-color: ${Colors.GRAY1};
        &:hover {
          border-left-color: ${Colors.GRAY3};
        }
      }
      &:decrement {
        border-left-width: 0;
        border-right-color: ${Colors.GRAY1};
        &:hover {
          border-right-color: ${Colors.GRAY3};
        }
      }
    }
    &:vertical {
      &:increment {
        border-bottom-width: 0;
        border-top-color: ${Colors.GRAY1};
        &:hover {
          border-top-color: ${Colors.GRAY3};
        }
      }
      &:decrement {
        border-top-width: 0;
        border-bottom-color: ${Colors.GRAY1};
        &:hover {
          border-bottom-color: ${Colors.GRAY3};
        }
      }
    }
  }
  &::-webkit-scrollbar-track {
    background: ${Colors.DARK_GRAY2};
  }
  &::-webkit-scrollbar-thumb {
    background: ${Colors.DARK_GRAY4};
    &:hover {
      background: ${Colors.DARK_GRAY5};
    }
  }
`;
