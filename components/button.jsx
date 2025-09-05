"use client";
import { useEffect, useState } from "react";
import { Download } from 'lucide-react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    console.log("👍 beforeinstallprompt fired", e);
    setDeferredPrompt(e);
    setVisible(true);
  };

  window.addEventListener("beforeinstallprompt", handler);

  window.addEventListener("appinstalled", () => {
    console.log("✅ App installed successfully!");
  });

  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);

  const handleClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    setDeferredPrompt(null);
    setVisible(false);
  };

  if (!visible) return null;

  return <button onClick={handleClick} title="Download shortcut"><Download size={18}/></button>;
}
