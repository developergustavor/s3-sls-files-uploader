// packages
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

// components
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// libs
import { useI18n } from '@/libs/i18n/useTranslation'

// constants
import { SOCIAL_LINKS } from '@/constants/social'

export function SocialButtons() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useI18n()

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="absolute bottom-0 right-16 flex items-center gap-2">
              {SOCIAL_LINKS.map((link, index) => {
                const Icon = link.icon
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.1 }}>
                        <Button variant="outline" size="icon" className="rounded-full neon-border hover:neon-text" asChild>
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-5 w-5" />
                          </a>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-primary-foreground">
                        {link.title}: <span className="font-bold">{link.value}</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="rounded-full neon-border hover:neon-text">
              {isExpanded ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-primary-foreground">{t('social.connect')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
