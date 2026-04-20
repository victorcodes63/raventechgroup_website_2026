'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type SafeRasterImageProps = Omit<ImageProps, 'onError'> & {
  fallbackClassName?: string
}

/**
 * Falls back to a dark gradient slab if the remote/static asset 404s
 * (placeholder images until real assets ship).
 */
export function SafeRasterImage({ fallbackClassName, className, alt, ...props }: SafeRasterImageProps) {
  const [failed, setFailed] = useState(false)

  const fill = 'fill' in props && props.fill

  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-[#161616] via-[#111111] to-[#0A0A0A] ${fill ? 'absolute inset-0 h-full w-full' : ''} ${fallbackClassName ?? ''} ${className ?? ''}`}
        aria-hidden={alt ? undefined : true}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
      />
    )
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
