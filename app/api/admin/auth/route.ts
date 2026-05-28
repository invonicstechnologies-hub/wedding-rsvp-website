import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    console.log('Received password:', password)
    console.log('Expected password:', process.env.ADMIN_PASSWORD)

    const expectedPassword = process.env.ADMIN_PASSWORD?.trim()
    
    if (expectedPassword && password?.trim() === expectedPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Incorrect password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
