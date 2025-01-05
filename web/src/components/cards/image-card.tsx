// components
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type ImageCardProps = {
  title?: string
  imageUrl: string
  alt: string
}

export function ImageCard({ imageUrl, alt }: ImageCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img src={imageUrl} alt={alt} className="object-cover w-full h-full" />
      </AspectRatio>
    </Card>
  )
}
