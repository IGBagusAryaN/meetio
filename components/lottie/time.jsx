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
      className='-mt-10'
      animationData={animationData}
      loop
      autoplay
      style={{ width: 500, height: 500 }}
    />
  );
}
