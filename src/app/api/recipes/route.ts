import { readdirSync, statSync } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

function getComponentFiles(dir: string): string[] {
  const results: string[] = []
  const files = readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = statSync(filePath)

    if (stat.isFile() && file.endsWith('.tsx') && !file.startsWith('_')) {
      results.push(path.relative(dir, filePath))
    }
  }

  return results
}

export async function GET() {
  const componentsPath = path.join(process.cwd(), 'src', 'recipes')
  const files = getComponentFiles(componentsPath)

  return NextResponse.json({ files })
}
