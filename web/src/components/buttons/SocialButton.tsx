// packages
import { LucideProps } from 'lucide-react'

// components
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// types
type SocialButtonProps = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  href: string
  title: string
  value: string
}

export function SocialButton({ icon: Icon, href, title, value }: SocialButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="hover:text-primary dark:hover:text-muted-foreground group" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer" className="flex gap-x-2">
            <Icon className="w-5 h-5" />
            <span className="text-foreground group-hover:text-primary dark:group-hover:text-muted-foreground">{title}</span>
          </a>
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p className="text-primary-foreground">
          <span className="font-bold">{value}</span>
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
