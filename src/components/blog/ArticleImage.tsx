import Image from 'next/image'

interface ArticleImageProps {
  src: string
  alt: string
  caption?: string
  align?: 'center' | 'left' | 'right'
  width?: number
  height?: number
}

export default function ArticleImage({
  src,
  alt,
  caption,
  align = 'center',
  width = 800,
  height = 400,
}: ArticleImageProps) {
  const alignmentClasses = {
    center: 'mx-auto',
    left: 'float-left mr-6 mb-4',
    right: 'float-right ml-6 mb-4',
  }

  const containerClasses = align === 'center'
    ? 'max-w-3xl mx-auto'
    : 'max-w-sm'

  return (
    <figure className={`${alignmentClasses[align]} ${containerClasses} my-8`}>
      <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
        {src.startsWith('http') || src.startsWith('/') ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="flex items-center justify-center" style={{ height: height }}>
            <span className="text-6xl">{src}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-slate-500 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
