'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function TimeLottie() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/time.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
      className=''
      animationData={animationData}
      loop
      autoplay
       style={{
          width: "100%",
          maxWidth: 500,   // maksimal width desktop
          height: "auto",  // maintain aspect ratio
        }}
    />
  );
}
