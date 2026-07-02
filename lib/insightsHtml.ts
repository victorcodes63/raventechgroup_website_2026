import rehypeParse from 'rehype-parse'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypePrettyCode, {
    theme: 'github-dark',
    keepBackground: false,
  })
  .use(rehypeStringify)

export async function formatInsightHtml(inputHtml: string): Promise<string> {
  const file = await processor.process(inputHtml)
  return String(file)
}
