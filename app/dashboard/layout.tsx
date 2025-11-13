"use client"
import React, {useEffect} from 'react'

import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import {useAuth} from "@/context/useAuth";
import {useRouter} from "next/navigation";
import {LoaderOne} from "@/components/ui/loader";

const DashboardLayout = ({children}:any) => {

    const {user, loading} = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!user && !loading) {
            router.replace("/sign-up")
        }
    }, [user, router, loading])
    if (!user && loading) {
        return <div className='w-screen h-screen flex items-center justify-center'>
            <LoaderOne/>
        </div>
    }
    return (
        <div>
            <div className='md:w-64 h-screen fixed'>
                <AppSidebar/>
            </div>
            <div className='md:ml-64'>

                {children}
            </div>
        </div>
    )
}
export default DashboardLayout
