import React from 'react'
import App from './App'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { ThemeProvider } from 'next-themes'

const Agent = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </ThemeProvider>
)

export default Agent;