/**
 * One-time / occasional fetch of hero images for service detail pages.
 * Run: npm run download:service-images
 */
const fs = require('fs')
const path = require('path')
const https = require('https')

const outDir = path.join(__dirname, '..', 'public', 'images', 'photos')

const downloads = [
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    file: 'cloud-solutions.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
    file: 'cybersecurity.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=80',
    file: 'digital-transformation.jpg',
  },
]

function fetchBuffer(url, redirectDepth = 0) {
  if (redirectDepth > 5) {
    return Promise.reject(new Error('Too many redirects'))
  }
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
          const loc = res.headers.location
          if (!loc) {
            reject(new Error('Redirect without location'))
            return
          }
          const nextUrl = new URL(loc, url).href
          res.resume()
          resolve(fetchBuffer(nextUrl, redirectDepth + 1))
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`))
          return
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      })
      .on('error', reject)
  })
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  for (const { url, file } of downloads) {
    const dest = path.join(outDir, file)
    process.stdout.write(`Downloading ${file}... `)
    const buf = await fetchBuffer(url)
    fs.writeFileSync(dest, buf)
    process.stdout.write(`ok (${buf.length} bytes)\n`)
  }

  const srcWeb = path.join(__dirname, '..', 'public', 'images', 'services', 'web-development.jpeg')
  const destWeb = path.join(outDir, 'web-development.jpg')
  if (fs.existsSync(srcWeb)) {
    fs.copyFileSync(srcWeb, destWeb)
    process.stdout.write('Copied web-development.jpg from public/images/services/web-development.jpeg\n')
  } else {
    process.stderr.write('Warning: web-development.jpeg not found; add public/images/photos/web-development.jpg manually.\n')
  }
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`)
  process.exit(1)
})
