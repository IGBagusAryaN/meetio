'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function NotfoundLottie() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/notfound.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 700, height: 700 }}
    />
  );
}
