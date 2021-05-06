import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';

interface RenderImageFromFileProps {
  className?: string;
  file?: File | string;
}

const ImageStyle = styled.img`
  max-width: 100%;
`;

export const RenderImageFromFile = memo<RenderImageFromFileProps>((props) => {
  const imgURL = useMemo(() => {
    if (!props.file) return;

    if (typeof props.file === 'string') return props.file;

    return URL.createObjectURL(props.file);
  }, [props.file]);

  const handleImageLoaded = useCallback(() => {
    if (imgURL && imgURL.startsWith('blob:')) URL.revokeObjectURL(imgURL);
  }, [imgURL]);

  if (props.file === undefined) return null;

  if (!props.file) return <span>An image file is required</span>;

  return (
    <ImageStyle
      className={props.className}
      src={imgURL}
      onLoad={handleImageLoaded}
    />
  );
});
