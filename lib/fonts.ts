import localFont from 'next/font/local';

// Same Jost.ttf shipped in the Flutter app (assets/fonts/Jost.ttf) — a variable
// font; the app uses weights 400 and 700.
export const jost = localFont({
  src: '../app/fonts/Jost.ttf',
  variable: '--font-jost',
  weight: '100 900',
  display: 'swap',
});
