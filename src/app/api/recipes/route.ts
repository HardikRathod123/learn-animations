import { RECIPES } from '@/lib/constants'
import { TRecipe } from '@/lib/types'
import { NextResponse } from 'next/server'

function getRecipes(): TRecipe[] {
  const recipes = RECIPES
  return recipes
}

export async function GET() {
  const recipes = getRecipes()
  return NextResponse.json({ recipes })
}
