// packages
import { motion } from 'framer-motion'

// components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/components/themes/ThemeProvider'

// libs
import { useI18n } from '@/libs/i18n/useTranslation'
import { cn } from '@/libs/utils'

// types
type LogoProps = {
  variant?: 'icon' | 'horizontal' | 'vertical'
  className?: string
}

export function Logo({ variant = 'horizontal', className }: LogoProps) {
  const { theme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  const bracketVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: [1, 1.2, 1],
      y: [0, -2, 2, -1, 1, 0],
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  }

  const letterVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: [1, 1.15, 1],
      rotateY: [0, 180, 360],
      transition: {
        duration: 1,
        ease: 'easeInOut'
      }
    }
  }

  const dotVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  const containerVariants = {
    hover: {
      boxShadow: isDark ? ['0 0 15px rgba(0,160,233,0.5)', '0 0 25px rgba(0,160,233,0.7)', '0 0 35px rgba(0,160,233,0.5)'] : ['0 0 15px rgba(0,108,158,0.3)', '0 0 20px rgba(0,108,158,0.5)', '0 0 25px rgba(0,108,158,0.3)'],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  }

  const textAnimation = {
    rest: { x: 0 },
    hover: {
      x: 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  const LogoIcon = () => (
    <motion.div
      className={cn('w-10 h-10 relative', 'rounded-lg overflow-hidden', 'flex items-center justify-center', isDark ? 'bg-[#001a2c]' : 'bg-[#e6f3ff]', 'border-2', isDark ? 'border-[#00a0e9]' : 'border-[#006c9e]', 'transition-all duration-300')}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={containerVariants}
    >
      <motion.span className={cn('absolute left-1 font-mono text-lg', isDark ? 'text-[#00a0e9]' : 'text-[#006c9e]')} variants={bracketVariants}>
        {'{'}
      </motion.span>
      <motion.span className={cn('absolute right-1 font-mono text-lg', isDark ? 'text-[#00a0e9]' : 'text-[#006c9e]')} variants={bracketVariants}>
        {'}'}
      </motion.span>

      <motion.div className={cn('text-xl font-bold', isDark ? 'text-[#00a0e9]' : 'text-[#006c9e]')} variants={letterVariants}>
        G
      </motion.div>

      <motion.div className={cn('absolute top-1 right-3 w-1.5 h-1.5 rounded-full', isDark ? 'bg-[#00a0e9]' : 'bg-[#006c9e]')} variants={dotVariants} />
      <motion.div className={cn('absolute bottom-1 left-3 w-1.5 h-1.5 rounded-full', isDark ? 'bg-[#00a0e9]' : 'bg-[#006c9e]')} variants={dotVariants} />
    </motion.div>
  )

  const LogoText = () => (
    <motion.div className="flex flex-col" initial="rest" whileHover="hover" animate="rest">
      <motion.span className={cn('text-lg font-bold tracking-wider', isDark ? 'text-white' : 'text-[#002b3f]')} variants={textAnimation}>
        Gustavo Henrique
      </motion.span>
      <motion.span className="text-sm text-muted-foreground" variants={textAnimation}>
        {t('brand.tagline')}
      </motion.span>
    </motion.div>
  )

  if (variant === 'icon') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className={className}>
              <LogoIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('brand.tooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={cn('flex flex-col items-center gap-4', className)}>
        <LogoIcon />
        <LogoText />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <LogoIcon />
      <LogoText />
    </div>
  )
}
