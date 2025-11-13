'use client'
import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Layout, LogOut, StarIcon} from "lucide-react";
import {FaBoltLightning} from "react-icons/fa6";
import {Progress} from "@/components/ui/progress";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/context/useAuth";
import {FaUsers} from "react-icons/fa";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const AppSidebar = () => {
    const {user, logout} = useAuth()
    const router = useRouter()

    return (
        <div className='shadow-md px-3 py-4 h-screen flex flex-col justify-between pb-6 '>

            <div className='mt-4 px-4 flex flex-col gap-4'>
                <Image src="/logo.png" alt='logo' className='rounded-lg' width={64} height={54}/>
                <Link href="/dashboard">
                    <Button className='w-full' >Загрузить pdf
                    </Button>
                </Link>


                <Link href="/designs" >
                    <div className='flex px-4 py-2 rounded-sm cursor-pointer hover:bg-primary-foreground transition-all items-center    gap-2'>
                        <Layout/>
                        <h2>Мой вайфрэмы</h2>
                    </div>
                </Link>
                <Link href="/pricing" >
                    <div className='flex cursor-pointer px-4 py-2 rounded-sm  hover:bg-primary-foreground transition-all items-center    gap-2'>
                        <FaBoltLightning/>
                        <h2>Купить звезды</h2>
                    </div>
                </Link>
                <Link href="/profile" >
                    <div className='flex px-4 py-2 rounded-sm cursor-pointer hover:bg-primary-foreground transition-all  items-center   gap-2'>
                        <FaUsers/>
                        <h2>Профиль</h2>
                    </div>
                </Link>



            </div>
            <div   className='flex flex-col gap-2'  >
                <div>
                    <p className='font-semibold text-sm my-2'>Осталось звезд: </p>
                    <Progress
                        value={user?.credits || 0}
                        max={21}
                        label="Оставшиеся звезды"
                    />
                </div>
                <div className="flex items-center justify-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>

                            <Avatar>
                                <AvatarImage src={user?.avatarUrl}/>
                                <AvatarFallback className='bg-primary '>
                                    {user?.userName[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>



                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div className='flex flex-col '>
                            <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'>

                                Мой вайфрэймы</p>
                            <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'>Купить звезды</p>
                            <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer' onClick={() => {
                                logout()
                                router.replace("/sign-up")
                                toast.success("Logout!")
                            }}>Выйти</p>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={() => {
                    logout()
                    router.replace("/sign-up")
                    toast.success("Logout!")
                }} className="flex-1" variant='destructive'>
                    <LogOut/>
                    Выйти
                </Button>
                </div>
            </div>

        </div>
    )
}
export default AppSidebar
