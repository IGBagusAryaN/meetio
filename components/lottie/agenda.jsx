'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function AgendaLottie() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/agenda.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
      className='-mt-48 md:-mt-20 md:-ml-20'
      animationData={animationData}
      loop
      autoplay
      style={{ width: 650, height: 650 }}
    />
  );
}
