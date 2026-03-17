import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    
    // TODO : Implement proxy logic here
    console.log("From PROXY : ", request.cookies.get('accessToken')?.value)
    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/',
}