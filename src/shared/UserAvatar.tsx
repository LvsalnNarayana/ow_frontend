import { useRef, useEffect, type JSX } from 'react';

import multiavatar from '@multiavatar/multiavatar/esm';

import { Avatar } from '@mui/material';

export const UserAvatar = (props: {
  width: number;
  height?: number;
  username: string;
}): JSX.Element => {
  const { width, height, username } = props;
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgCode = multiavatar(username);

    if (avatarRef.current) {
      avatarRef.current.innerHTML = svgCode;
    }
  }, [username]);

  return (
    <>
      {username ? (
        <div
          style={{
            width,
            height,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          ref={avatarRef}
        />
      ) : (
        <Avatar
          sx={{
            p: 0.5,
            flexShrink: 0,
            width: width + 2,
            height: (height || width) + 2,
            backgroundColor: '#00000040',
          }}
          src="/ape.png"
        />
      )}
    </>
  );
};

export default UserAvatar;
