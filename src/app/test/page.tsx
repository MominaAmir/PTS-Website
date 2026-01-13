'use client'

import { useState } from 'react'

const ColorTestPage = () => {
  const [primaryColor, setPrimaryColor] = useState('#1a365d')
  const [secondaryColor, setSecondaryColor] = useState('#c9a96e')
  
  const colorSchemes = [
    { name: 'Modern Luxury', primary: '#1a365d', secondary: '#c9a96e' },
    { name: 'Elegant Earth', primary: '#2c5530', secondary: '#d4a96e' },
    { name: 'Sophisticated', primary: '#4a5568', secondary: '#cbd5e0' },
    { name: 'Warm Minimal', primary: '#7c3aed', secondary: '#f59e0b' },
    { name: 'Coastal', primary: '#0e7490', secondary: '#fbbf24' },
    { name: 'Custom', primary: '#000000', secondary: '#ffffff' },
  ]

  const applyColors = (primary: string, secondary: string) => {
    setPrimaryColor(primary)
    setSecondaryColor(secondary)
    
    // Apply to CSS variables
    document.documentElement.style.setProperty('--primary', primary)
    document.documentElement.style.setProperty('--secondary', secondary)
    
    // Apply to Tailwind classes
    const root = document.documentElement
    root.style.setProperty('--color-primary', primary)
    root.style.setProperty('--color-secondary', secondary)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Color Scheme Tester</h1>
      
      {/* Color Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Colors</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div 
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: primaryColor }}
                />
                <div>
                  <p className="font-medium">Primary: {primaryColor}</p>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => applyColors(e.target.value, secondaryColor)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div 
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: secondaryColor }}
                />
                <div>
                  <p className="font-medium">Secondary: {secondaryColor}</p>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => applyColors(primaryColor, e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Components */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Color Background
            </div>
            
            <div 
              className="p-4 rounded-lg text-black"
              style={{ backgroundColor: secondaryColor }}
            >
              Secondary Color Background
            </div>
            
            <button 
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
              }}
            >
              Gradient Button
            </button>
          </div>
        </div>
      </div>

      {/* Preset Schemes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Preset Color Schemes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.name}
              onClick={() => applyColors(scheme.primary, scheme.secondary)}
              className="p-4 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex space-x-1">
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: scheme.secondary }}
                  />
                </div>
                <p className="text-sm font-medium">{scheme.name}</p>
                <p className="text-xs text-gray-500">
                  {scheme.primary} / {scheme.secondary}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Test Components */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Component Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
              Card Title
            </h3>
            <p className="text-gray-600 mb-4">This is a sample card with your colors</p>
            <button 
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: secondaryColor }}
            >
              Action Button
            </button>
          </div>
          
          <div 
            className="rounded-lg p-6 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <h3 className="text-lg font-bold mb-2">Dark Card</h3>
            <p className="opacity-90 mb-4">This shows text on primary background</p>
            <button 
              className="px-4 py-2 rounded bg-white text-black hover:bg-gray-100"
            >
              Light Button
            </button>
          </div>
          
          <div className="border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: secondaryColor }}
              />
              <div>
                <h4 className="font-semibold" style={{ color: primaryColor }}>Avatar</h4>
                <p className="text-sm text-gray-500">With secondary color</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-gray-200">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: '70%',
                    backgroundColor: primaryColor 
                  }}
                />
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: '40%',
                    backgroundColor: secondaryColor 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Export */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
        <pre className="bg-black text-white p-4 rounded text-sm overflow-x-auto">
{`:root {
  --primary: ${primaryColor};
  --primary-light: ${lightenColor(primaryColor, 20)};
  --primary-dark: ${darkenColor(primaryColor, 20)};
  --secondary: ${secondaryColor};
  --secondary-light: ${lightenColor(secondaryColor, 20)};
  --secondary-dark: ${darkenColor(secondaryColor, 20)};
}`}
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(`:root {
  --primary: ${primaryColor};
  --secondary: ${secondaryColor};
}`)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy CSS Variables
        </button>
      </div>
    </div>
  )
}

// Helper functions for lightening/darkening colors
function lightenColor(color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1)
}

function darkenColor(color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = (num >> 8 & 0x00FF) - amt
  const B = (num & 0x0000FF) - amt
  return '#' + (
    0x1000000 +
    (R > 0 ? R : 0) * 0x10000 +
    (G > 0 ? G : 0) * 0x100 +
    (B > 0 ? B : 0)
  ).toString(16).slice(1)
}

export default ColorTestPage