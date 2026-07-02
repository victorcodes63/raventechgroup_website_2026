type ProseContentProps = {
  html: string
  className?: string
}

/**
 * Long-form HTML (insights) with Raven dark typography.
 * Content comes from controlled local data files.
 */
export function ProseContent({ html, className = '' }: ProseContentProps) {
  return (
    <div
      className={`prose-raven prose prose-invert max-w-[680px] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
