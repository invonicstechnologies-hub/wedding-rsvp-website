import { NextResponse } from 'next/server'

const NOCODB_URL =
  'https://nocodb-production-54ae.up.railway.app/api/v1/db/data/v1/Guests/Guests'

export async function GET() {
  const token = process.env.NOCODB_API_TOKEN

  if (!token) {
    console.error('NOCODB_API_TOKEN is not configured')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(NOCODB_URL, {
      headers: {
        'xc-token': token,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NocoDB error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to fetch guest data' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const guests = data.list || []

    return NextResponse.json({ guests })
  } catch (error) {
    console.error('NocoDB fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
