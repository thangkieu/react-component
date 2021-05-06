import React, { useCallback, useState } from 'react';
import { CameraAccess } from './modules/CameraAccess';
import { CircleProgress } from './modules/CircleProgress';
import { FBShare } from './modules/FBShare';
import { Header } from './modules/Header';
import { MobileCameraAccess } from './modules/MobileCameraAccess';
import { RenderImageFromFile } from './modules/RenderImageFromFile';

function App() {
  const [loadedFile, setLoadedFile] = useState<File>();

  const handleCapture = useCallback((file: File) => {
    setLoadedFile(file);
  }, []);

  return (
    <div>
      <Header />

      <CircleProgress width={400} percentage={75} stroke={20} />

      <MobileCameraAccess onCaptured={handleCapture} />

      <RenderImageFromFile file={loadedFile} />

      <CameraAccess width={500} height={300} />

      <FBShare
        fbAppId="559268918372459"
        photos={[
          'https://live.staticflickr.com/65535/51124674032_a2d954fdce_k.jpg',
        ]}
      />
    </div>
  );
}

export default App;
