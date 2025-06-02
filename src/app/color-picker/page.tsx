'use client';

import { useState, useEffect } from 'react';

interface ColorScheme {
  name: string;
  colors: string[];
}

interface ContrastRatio {
  white: number;
  black: number;
  whiteRating: string;
  blackRating: string;
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState('rgb(0, 0, 0)');
  const [hsl, setHsl] = useState('hsl(0, 0%, 0%)');
  const [schemes, setSchemes] = useState<ColorScheme[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [contrastRatio, setContrastRatio] = useState<ContrastRatio>({
    white: 0,
    black: 0,
    whiteRating: '',
    blackRating: '',
  });

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const calculateContrastRatio = (r: number, g: number, b: number) => {
    // Convert RGB to relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const getContrastRatio = (l1: number, l2: number) => {
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const colorLuminance = getLuminance(r, g, b);
    const whiteLuminance = 1;
    const blackLuminance = 0;

    const whiteRatio = getContrastRatio(colorLuminance, whiteLuminance);
    const blackRatio = getContrastRatio(colorLuminance, blackLuminance);

    const getRating = (ratio: number) => {
      if (ratio >= 7) return 'AAA';
      if (ratio >= 4.5) return 'AA';
      if (ratio >= 3) return 'A';
      return 'Fail';
    };

    setContrastRatio({
      white: Number(whiteRatio.toFixed(2)),
      black: Number(blackRatio.toFixed(2)),
      whiteRating: getRating(whiteRatio),
      blackRating: getRating(blackRatio),
    });
  };

  const updateColor = (hexValue: string) => {
    setHex(hexValue);
    // Convert HEX to RGB
    const r = parseInt(hexValue.slice(1, 3), 16);
    const g = parseInt(hexValue.slice(3, 5), 16);
    const b = parseInt(hexValue.slice(5, 7), 16);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    // Convert RGB to HSL
    const hslValue = rgbToHsl(r, g, b);
    setHsl(`hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`);
    // Generate color schemes
    generateColorSchemes(hslValue.h, hslValue.s, hslValue.l);
    // Calculate contrast ratios
    calculateContrastRatio(r, g, b);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateColorSchemes = (h: number, s: number, l: number) => {
    const newSchemes: ColorScheme[] = [
      {
        name: 'Complementary',
        colors: [
          hslToHex(h, s, l),
          hslToHex((h + 180) % 360, s, l),
        ],
      },
      {
        name: 'Analogous',
        colors: [
          hslToHex((h - 30 + 360) % 360, s, l),
          hslToHex(h, s, l),
          hslToHex((h + 30) % 360, s, l),
        ],
      },
      {
        name: 'Triadic',
        colors: [
          hslToHex(h, s, l),
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
        ],
      },
      {
        name: 'Split Complementary',
        colors: [
          hslToHex(h, s, l),
          hslToHex((h + 150) % 360, s, l),
          hslToHex((h + 210) % 360, s, l),
        ],
      },
    ];
    setSchemes(newSchemes);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Color Picker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="colorPicker" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pick a Color
            </label>
            <input
              id="colorPicker"
              type="color"
              value={hex}
              onChange={(e) => updateColor(e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="hex" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                HEX
              </label>
              <div className="relative">
                <input
                  id="hex"
                  type="text"
                  value={hex}
                  onChange={(e) => updateColor(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(hex, 'hex')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {copied === 'hex' ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="rgb" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                RGB
              </label>
              <div className="relative">
                <input
                  id="rgb"
                  type="text"
                  value={rgb}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(rgb, 'rgb')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {copied === 'rgb' ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="hsl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                HSL
              </label>
              <div className="relative">
                <input
                  id="hsl"
                  type="text"
                  value={hsl}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(hsl, 'hsl')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {copied === 'hsl' ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Accessibility</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">White Text</span>
                  <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
                    {contrastRatio.whiteRating}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Contrast Ratio: {contrastRatio.white}:1
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Black Text</span>
                  <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
                    {contrastRatio.blackRating}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Contrast Ratio: {contrastRatio.black}:1
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Color Schemes</h2>
          {schemes.map((scheme) => (
            <div key={scheme.name} className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{scheme.name}</h3>
              <div className="flex gap-2">
                {scheme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform relative group"
                    style={{ backgroundColor: color }}
                    onClick={() => updateColor(color)}
                    title={color}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(color, `scheme-${index}`);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      {copied === `scheme-${index}` ? (
                        <span className="text-white text-sm font-medium">✓</span>
                      ) : (
                        <span className="text-white text-sm font-medium">Copy</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 