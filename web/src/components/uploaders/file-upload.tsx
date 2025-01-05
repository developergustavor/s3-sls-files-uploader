// packages
import { useState } from 'react'

// components
import { Button } from '@/components/ui/button'
import { DropZone } from '@/components/uploaders/drop-zone'
import { FileList } from '@/components/uploaders/file-list'
import { UploadProgress } from '@/components/uploaders/upload-progress'

// hooks
import { useToast } from '@/hooks/use-toast'

// libs
import { useI18n } from '@/libs/i18n/useTranslation'

// types
type FileUploadProps = {
  onUpload(urls: string[]): void
  onClear(): void
}

export function FileUpload({ onUpload, onClear }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [uploaded, setUploaded] = useState<boolean>(false)
  const { toast } = useToast()
  const { t } = useI18n()

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
  }

  const handleRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    try {
      setUploading(true)
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch(`${import.meta.env.VITE_API_URL || process.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentCompleted)
        }
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()

      toast({
        title: t('toast.success.title'),
        description: t('toast.success.description')
      })

      setUploaded(true)
      onUpload(result.files.map(f => f.url))
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('toast.error.title'),
        description: t('toast.error.description')
      })
    } finally {
      setUploading(false)
    }
  }

  const clearFiles = () => {
    setUploaded(false)
    setFiles([])
    setProgress(0)
    onClear()
  }

  return (
    <div className="min-w-[80%] space-y-6">
      {!uploaded && (
        <>
          <DropZone onDrop={handleDrop} disabled={uploading} />

          {files.length > 0 && (
            <div className="space-y-4">
              <FileList files={files} uploaded={uploaded} onRemove={handleRemove} />

              {uploading ? (
                <UploadProgress progress={progress} />
              ) : (
                <Button className="w-full" onClick={uploadFiles} disabled={files.length === 0}>
                  {t('uploaders.files.upload')} {files.length} {t('uploaders.files.file')}{files.length === 1 ? '' : 's'}
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {uploaded && (
        <Button variant="outline" className="border-red-700 bg-transparent text-red-700 hover:bg-transparent hover:text-red-700 hover:brightness-125 w-full" onClick={clearFiles}>
          {t('uploaders.files.buttons.reset')}
        </Button>
      )}
    </div>
  )
}
