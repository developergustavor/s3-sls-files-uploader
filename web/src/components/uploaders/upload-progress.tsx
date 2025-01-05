// packages
import { Progress } from "@/components/ui/progress";

// libs
import { useI18n } from '@/libs/i18n/useTranslation'

// interfaces
interface IUploadProgressProps {
  progress: number;
}

export function UploadProgress({ progress }: IUploadProgressProps) {
  const { t } = useI18n()

  return (
    <div className="space-y-2">
      <Progress value={progress} />
      <p className="text-sm text-center text-gray-500">{t('uploaders.files.progress')} {progress.toFixed(0)}%</p>
    </div>
  );
}
