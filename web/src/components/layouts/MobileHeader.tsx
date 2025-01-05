// packages
import { useState } from 'react'
import { Menu } from 'lucide-react'

// components
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brands/Logo'
import { useTheme } from '@/components/themes/ThemeProvider'
import { SocialButton } from '@/components/buttons/SocialButton'

// libs
import { useI18n } from '@/libs/i18n/useTranslation'

// constants
import { SOCIAL_LINKS } from '@/constants/social'

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleNavClick = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={`glass-drawer glass-drawer-${theme} border-r-0`}>
        <div className="flex justify-center mb-8">
          <Logo variant="vertical" />
        </div>
        <nav className="flex flex-col space-y-4">
          {SOCIAL_LINKS.map((sl, index) => (
            <SocialButton onClick={() => handleNavClick(sl)} key={index} href={sl.href} icon={sl.icon} value={sl.value} title={sl.title} className="text-lg font-medium hover:text-[#006c9e] transition-colors px-4 py-2 rounded-md hover:bg-accent text-left" />
          ))}
          {/* {navItems.map(item => (
            <button key={item} onClick={() => handleNavClick(item)} className="text-lg font-medium hover:text-[#006c9e] transition-colors px-4 py-2 rounded-md hover:bg-accent text-left">
              {t(`nav.${item}`)}
            </button>
          ))} */}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
