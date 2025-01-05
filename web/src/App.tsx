// packages
import { createElement, ReactNode } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// utils
import { routes } from '@/utils/routes-util'

// components
import { ThemeProvider } from '@/components/themes/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'

// pages
import NotFound from '@/pages/NotFound'
import HomePage from '@/pages/Home'

function Main({ children }: { children: Readonly<ReactNode> }) {
  return <div className="bg-background text-foreground min-h-screen">{children}</div>
}

function App() {
  return (
    <Routes>
      {routes.map(route => {
        return <Route key={route.name} path={route.path} element={route.component ? <Main>{createElement(route.component)}</Main> : <NotFound />} />
      })}
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <ThemeProvider>
        <TooltipProvider skipDelayDuration={true} delayDuration={0}>
          <App />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </Router>
  )
}
