'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    FoldersIcon, CrownIcon, LogOut, SunMoonIcon, LogInIcon, TabletIcon
} from "lucide-react";
import { useTheme } from "next-themes";
import Footer from "@/components/Footer";
import ImageUpload from "@/app/dashboard/_components/ImageUpload";
const AppHeader = () => {
    const {user, logout ,loading} = useAuth()
    const {theme, setTheme} = useTheme()
    const router =useRouter()
    console.log(user)
    return (
        <div className="flex sticky top-0   justify-between z-20 px-4  items-center">
            <Link href='/'>
                <Image
                    className="hidden md:block rounded-xl"
                    width={120}
                    height={120}
                    alt='logo'
                    src='/logo.png'
                />
            </Link>

            <div>
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.avatarUrl} />
                                <AvatarFallback className="bg-primary dark:bg-primary text-white">
                                    {user?.userName?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push('/designs')}>
                                <FoldersIcon className="mr-2" /> Мои вайфрэймы
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/pricing')}>
                                <CrownIcon className="mr-2" /> Купить кредиты
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                                <SunMoonIcon className="mr-2" /> Переключить тему
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={async () => {
                                    try {
                                        await logout();
                                        toast.success('Вы вышли!');
                                        router.replace('/sign-up');
                                    } catch {
                                        toast.error('Ошибка при выходе');
                                    }
                                }}
                            >
                                <LogOut className="mr-2" /> Выйти
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button onClick={() => router.push('/sign-in')}>
                        <LogInIcon className="mr-2" /> Войти
                    </Button>
                )}
            </div>
        </div>
    )
}
export default AppHeader
