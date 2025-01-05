// packages
import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

// components
import { ThemeToggle } from '@/components/themes/ThemeToggle'
import { LanguageToggle } from '@/components/languages/LanguageToggle'
import { MobileHeader } from '@/components/layouts/MobileHeader'
import { Logo } from '@/components/brands/Logo'
import { SocialButton } from '@/components/buttons/SocialButton'

// libs
import { cn } from '@/libs/utils'

// constants
import { SOCIAL_LINKS } from '@/constants/social'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange(latest => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <motion.header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isScrolled ? 'glass-card border-b' : 'bg-transparent')} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="md:hidden">
          <MobileHeader />
        </div>

        <div className="hidden md:block">
          <Logo variant="horizontal" />
        </div>

        <div className="md:hidden">
          <Logo variant="icon" />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {SOCIAL_LINKS.map((sl, index) => (
            <SocialButton key={index} href={sl.href} icon={sl.icon} value={sl.value} title={sl.title} />
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
