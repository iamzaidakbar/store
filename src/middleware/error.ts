import { NextResponse } from 'next/server'

export function handleError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
} 