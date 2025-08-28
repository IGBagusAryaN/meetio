'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LoadingLottie() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/loading.json')
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
      style={{ width: 150, height: 150 }}
    />
  );
}
