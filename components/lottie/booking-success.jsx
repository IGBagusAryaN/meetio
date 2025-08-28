'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function BookingSuccess() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/booking.json')
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
      style={{ width: 250, height: 250 }}
    />
  );
}
