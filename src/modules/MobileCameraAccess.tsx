import React, { FC, memo, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';

interface MobileCameraAccessProps {
  children?: React.ReactNode;
  className?: string;
  wrapperTag?: string;
  onCaptured?(file: File): void;
}

const Wrapper = styled.div`
  label * {
    pointer-events: none;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }
`;

export const MobileCameraAccess: FC<MobileCameraAccessProps> = memo((props) => {
  const idRef = useRef(Date.now());

  const handleCapture = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) props.onCaptured?.(file);
    },
    [props.onCaptured]
  );

  return (
    <Wrapper className={props.className} as={props.wrapperTag as any}>
      <>
        <label htmlFor={`camera-access-${idRef.current}`}>
          {props.children}
        </label>
        <input
          id={`camera-access-${idRef.current}`}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleCapture}
        />
      </>
    </Wrapper>
  );
});

MobileCameraAccess.defaultProps = {
  children: <button type="button">Take Photo</button>,
};
