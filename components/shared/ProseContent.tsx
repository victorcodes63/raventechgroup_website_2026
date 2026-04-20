import DOMPurify from 'isomorphic-dompurify'

type ProseContentProps = {
  html: string
  className?: string
}

/**
 * Sanitized long-form HTML (insights) with Raven dark typography.
 */
export function ProseContent({ html, className = '' }: ProseContentProps) {
  const clean = DOMPurify.sanitize(html, {
    ADD_ATTR: ['id', 'class', 'target', 'rel'],
  })

  return (
    <div
      className={`prose-raven prose prose-invert max-w-[680px] ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
