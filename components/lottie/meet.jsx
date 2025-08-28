'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function MeetioLottie() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/meet.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
    className='-mr-20'
      animationData={animationData}
      loop
      autoplay
      style={{ width: 550, height: 550 }}
    />
  );
}
