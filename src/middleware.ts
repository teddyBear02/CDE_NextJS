import { NextRequest, NextResponse } from "next/server"

const isLoggin : boolean = false // Get Session function => Checking 

export default function MiddleWare(res:NextRequest){
    if(isLoggin){
        return NextResponse.next()
    }else{
        const origin = res.nextUrl.clone();
        return NextResponse.redirect(new URL('/',origin))
    }
} 

export const config = {
    matcher: ["/project/:path"],
} 