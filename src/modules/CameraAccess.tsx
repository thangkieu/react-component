import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface CameraAccessProps {
  width: number;
  height: number;
  onCompleted?(photo: any): void;
}

type Size = { width: number; height: number };

const VideoWrapper = styled.div`
  position: relative;

  video,
  canvas {
    display: block;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const CameraAccess = memo<CameraAccessProps>((props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStartingCapture, toggleStartingCapture] = useState(false);

  const requestVideo = useCallback(async () => {
    if (!videoRef.current) return;

    if (!('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia))
      return;

    const constraints = {
      video: {
        width: props.width,
        height: props.height,
        facingMode: 'user',
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoRef.current.srcObject = stream;
  }, [props.width, props.height]);

  const stopVideo = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext('2d');

    context?.drawImage(videoRef.current, 0, 0, props.width, props.height);

    videoRef.current?.pause();

    (videoRef.current?.srcObject as MediaStream)
      ?.getTracks()
      .forEach((track) => track.stop());
  }, []);

  const handleCapture = useCallback(async () => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext('2d');

    if (videoRef.current?.paused) {
      await requestVideo();

      videoRef.current.play();

      videoRef.current.addEventListener('play', function onPlay() {
        context?.clearRect(0, 0, props.width, props.height);

        videoRef.current?.removeEventListener('play', onPlay);
      });
    } else {
      stopVideo();
    }
  }, [props.height, props.width, requestVideo]);

  const handleStartCapture = useCallback(() => {
    toggleStartingCapture(true);

    setTimeout(requestVideo, 0);
  }, []);

  useEffect(() => {
    // requestVideo();

    return () => {
      toggleStartingCapture(false);
      stopVideo();
    };
  }, []);

  if (!isStartingCapture)
    return <button onClick={handleStartCapture}>Start Capturing</button>;

  return (
    <>
      <VideoWrapper>
        <video
          ref={videoRef}
          autoPlay
          width={props.width}
          height={props.height}
        ></video>
        <canvas
          ref={canvasRef}
          width={props.width}
          height={props.height}
        ></canvas>
      </VideoWrapper>
      <button onClick={handleCapture}>Capture</button>
    </>
  );
});
