// app/navigate/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function NavigateIndex() {
  useEffect(() => {
    router.replace('/navigate/home');
  }, []);

  return null;
}
