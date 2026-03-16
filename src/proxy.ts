import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    
    // TODO : Implement proxy logic here

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/about/:path*',
}