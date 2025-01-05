// packages
import { Globe } from 'lucide-react'

// components
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// libs
import { useI18n } from '@/libs/i18n/useTranslation'

export function LanguageToggle() {
  const { setLanguage, t, language } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('languages.toggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className={`hover:cursor-pointer hover:bg-primary/10 ${language === 'pt-BR' ? 'bg-primary/30' : ''}`} onClick={() => setLanguage('pt-BR')}>
          <span className="mr-2">🇧🇷</span> {t('languages.pt-BR')}
        </DropdownMenuItem>
        <DropdownMenuItem className={`hover:cursor-pointer hover:bg-primary/10 ${language === 'en-US' ? 'bg-primary/30' : ''}`} onClick={() => setLanguage('en-US')}>
          <span className="mr-2">🇺🇸</span> {t('languages.en-ES')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
