import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, Colors, Classes, Intent } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { Flex } from '../../components/layout/Flex';

const AccountThumbnail = styled.div`
  width: ${({ big }) => (big ? '4rem' : '2rem')};
  height: ${({ big }) => (big ? '4rem' : '2rem')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
  background-color: ${Colors.GRAY1};
  border-radius: 50%;
  background-image: ${({ image }) => (image ? `url(${image})` : '')};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;
const AccountContent = styled(Flex)`
  width: 20rem;
`;
const SignOutButton = styled(Button)`
  align-self: flex-end;
`;

export const Account = ({ displayName, email, photoURL, onSignOut }) => (
  <Popover
    content={
      <AccountContent spaced="container" direction="column">
        <Flex spaced="items" align="center">
          <AccountThumbnail big image={photoURL} />
          <div>
            <p className={Classes.TEXT_LARGE}>{displayName}</p>
            <p className={`${Classes.TEXT_SMALL} ${Classes.TEXT_MUTED}`}>
              {email}
            </p>
          </div>
        </Flex>
        <SignOutButton
          minimal
          intent={Intent.DANGER}
          text="Sign out"
          onClick={onSignOut}
        />
      </AccountContent>
    }
  >
    <AccountThumbnail clickable image={photoURL} title={displayName} />
  </Popover>
);

Account.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  photoURL: PropTypes.string,
  onSignOut: PropTypes.func,
};
Account.defaultProps = {
  displayName: '',
  email: '',
  photoURL: '',
  onSignOut: () => {},
};
