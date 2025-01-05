// packages
import { useState } from 'react'

// components
import { Header } from "@/components/layouts/Header";
import { FileUpload } from '@/components/uploaders/file-upload'
import { ImageCard } from '@/components/cards/image-card'
import { ScrollToTop } from "@/components/navigations/ScrollToTop";
import { SocialButtons } from "@/components/buttons/SocialButtons";

export default function HomePage() {
  const [urls, setUrls] = useState<string[]>([])

  const _handleOnUpload = (receivedUrls: string[]) => {
    setUrls(receivedUrls)
  }

  return (
    <>
      <Header />

      <main className="bg-background min-w-screen min-h-screen flex flex-col items-center justify-center py-12 px-16">
        <div className="w-full flex flex-col items-center justify-center gap-y-2 mb-12 text-center">
          <h1 className="text-3xl text-primary font-bold">S3 + Serverless Framework Files Uploader</h1>
          <h3 className="text-xl text-muted-foreground">(LocalStack / S3 + AWS Lambda)</h3>
        </div>

        {!!urls.length && (
          <div className="container mx-auto p-4 max-h-[400px] overflow-y-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {urls.map((url, index) => (
                <ImageCard key={index} title={url.split('/')?.reverse().at(0)} imageUrl={url} alt={`Image ${index}`} />
              ))}
            </div>
          </div>
        )}

        <FileUpload onUpload={_handleOnUpload} onClear={() => setUrls([])} />
      </main>

      <ScrollToTop />
      <SocialButtons />
    </>
  )
}
