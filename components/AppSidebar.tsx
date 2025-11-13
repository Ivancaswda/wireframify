'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Layout, LogOut, StarIcon} from "lucide-react";
import { FaUsers} from "react-icons/fa";
import {Progress} from "@/components/ui/progress";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/context/useAuth";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import axios from "axios";

const AppSidebar = () => {
    const { logout } = useAuth()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    // Функция для получения пользователя с актуальными данными
    const fetchUser = async () => {
        try {
            const res = await axios.get("/api/auth/user")
            setUser(res.data.user)
        } catch (err) {
            console.error("Ошибка при получении пользователя:", err)
        }
    }

    // Получаем пользователя при монтировании компонента
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className='shadow-md px-3 py-4 h-screen flex flex-col justify-between pb-6'>
            <div className='mt-4 px-4 flex flex-col gap-4'>
                <Image src="/logo.png" alt='logo' className='rounded-lg' width={114} height={114}/>
                <Link href="/dashboard">
                    <Button className='w-full'>Загрузить pdf</Button>
                </Link>

                <Link href="/designs">
                    <div className='flex px-4 py-2 rounded-sm cursor-pointer hover:bg-primary-foreground transition-all items-center gap-2'>
                        <Layout/>
                        <h2>Мой вайфрэмы</h2>
                    </div>
                </Link>
                <Link href="/pricing">
                    <div className='flex cursor-pointer px-4 py-2 rounded-sm hover:bg-primary-foreground transition-all items-center gap-2'>
                        <StarIcon/>
                        <h2>Купить звезды</h2>
                    </div>
                </Link>
                <Link href="/profile">
                    <div className='flex px-4 py-2 rounded-sm cursor-pointer hover:bg-primary-foreground transition-all items-center gap-2'>
                        <FaUsers/>
                        <h2>Профиль</h2>
                    </div>
                </Link>
            </div>

            <div className='flex flex-col gap-2'>
                <div>
                    <Progress
                        value={user?.credits || 0}
                        max={40}
                        label="Оставшиеся звезды"
                    />
                </div>
                <div className="flex items-center justify-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.avatarUrl}/>
                                <AvatarFallback className='bg-primary'>
                                    {user?.userName?.[0]?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className='flex flex-col'>
                                <Link href={"/designs"} >
                                    <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'>

                                        Мой вайфрэймы</p>
                                </Link>
                                <Link href="/pricing" >
                                    <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'>Купить звезды</p>

                                </Link>
                                <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'
                                   onClick={() => {
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
