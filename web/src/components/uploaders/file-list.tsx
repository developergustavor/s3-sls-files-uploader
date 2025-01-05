// packages
import { X, FileIcon } from 'lucide-react'

// components
import { Button } from '@/components/ui/button'

// interfaces
interface IFileListProps {
  files: File[]
  uploaded: boolean
  onRemove: (index: number) => void
}

export function FileList({ files, uploaded, onRemove }: IFileListProps) {
  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {files.map((file, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-primary/10 dark:bg-gray-800 rounded-md">
          <div className="flex items-center space-x-2">
            <FileIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
          {!uploaded && (
            <Button variant="ghost" size="sm" onClick={() => onRemove(index)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
