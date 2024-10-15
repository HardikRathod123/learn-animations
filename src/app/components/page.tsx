import { readdirSync, statSync } from 'fs'
import Link from 'next/link'
import path from 'path'

export async function generateStaticParams() {
  return [{}]
}

function getComponentFiles(dir: string): string[] {
  const results: string[] = []
  const files = readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = statSync(filePath)

    if (stat.isFile() && file.endsWith('.tsx') && !file.startsWith('_')) {
      // Only include .tsx files that don't start with underscore and aren't index.tsx
      results.push(path.relative(dir, filePath))
    }
  }

  return results
}

export default function Page() {
  const componentsPath = path.join(process.cwd(), 'src', 'components')
  const files = getComponentFiles(componentsPath)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Component Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => {
          const [fileName] = file.split('.')
          return (
            <Link
              href={`/components/${fileName}`}
              key={fileName}
              className="block p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700 truncate">
                  {fileName}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
