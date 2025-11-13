'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { WireframeToCodeTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import axios from 'axios';
import {LoaderOne} from "@/components/ui/loader";
import AppHeader from "@/components/AppHeader";
import {useRouter} from "next/navigation";

const ProfilePage = () => {
    const { logout } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<{ totalWireframes: number }>({ totalWireframes: 0 });

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/auth/user');
            setUser(res.data.user);
        } catch (err) {
            console.error('Ошибка при получении пользователя:', err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get('/api/stats'); // мы создадим этот API
            setStats(res.data);
        } catch (err) {
            console.error('Ошибка при получении статистики:', err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchStats();
    }, []);
    const { loading} = useAuth()
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

    if (!user) return <div className="flex justify-center items-center h-[80vh]">
        <LoaderOne/>
    </div>;

    return (
        <>
            <AppHeader/>
            <div className="max-w-4xl mx-auto p-6">

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback className="bg-primary text-white text-3xl">
                            {user.userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{user.userName}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Дата регистрации: {new Date(user.createdAt).toLocaleDateString()}
                        </p>

                        <div className="mt-4">

                            <Progress value={user.credits} max={40} />
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white transition-all hover:scale-105 dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-2">Создано вайфреймов</h2>
                        <p className="text-3xl font-extrabold text-primary">{stats.totalWireframes}</p>
                    </div>
                    <div className="bg-white transition-all hover:scale-105 dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-2">Кредиты</h2>
                        <p className="text-3xl font-extrabold text-yellow-500">{user.credits}</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button className='py-4 w-full rounded-lg cursor-pointer' variant="destructive" onClick={() => logout()}>
                        Выйти
                    </Button>
                </div>
            </div>
        </>

    );
};

export default ProfilePage;
