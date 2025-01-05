// packages
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

// libs
import { cn } from '@/libs/utils'
import { useI18n } from '@/libs/i18n/useTranslation'

// interfaces
interface IDropZoneProps {
  onDrop: (files: File[]) => void
  disabled?: boolean
}

export function DropZone({ onDrop, disabled }: IDropZoneProps) {
  const { t } = useI18n()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled
  })

  return (
    <div {...getRootProps()} className={cn('border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors', isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary', disabled && 'opacity-50 cursor-not-allowed')}>
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">{isDragActive ? t('uploaders.files.drop') : t('uploaders.files.title')}</p>
    </div>
  )
}
