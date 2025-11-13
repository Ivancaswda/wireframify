'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/useAuth";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

function Signup() {
    const { user, loading, setUser } = useAuth()
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post('/api/auth/register', form)
            const data = await res.data

            localStorage.setItem("token", data.token)
            const userRes = await fetch("/api/auth/user", {
                headers: { Authorization: `Bearer ${data.token}` },
            });

            if (!userRes.ok) throw new Error("Failed to fetch user");

            const userData = await userRes.json();
            setUser(userData.user);

            router.push('/dashboard')
            toast.success('Добро пожаловать в Wireframify!')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Ошибка при регистрации")
            } else {
                toast.error("Непредвиденная ошибка")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {}

    useEffect(() => {
        if (!loading && user) {
            router.replace('/dashboard')
        }
    }, [user, loading])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white/90 shadow-xl p-8 backdrop-blur-md dark:bg-zinc-900">

                {/* Логотип */}
                <div className="flex justify-center mb-6">
                    <Image src="/logo.png" alt="Wireframify Logo" className="rounded-xl" width={64} height={64}/>
                </div>

                <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300">
                    Создать аккаунт в <span className="text-blue-600">Wireframify</span>
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Начни путь к созданию идей и прототипов с Wireframify.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                    <LabelInputContainer>
                        <Label htmlFor="userName">Имя пользователя</Label>
                        <Input
                            value={form.userName}
                            onChange={(e) => setForm({...form, userName: e.target.value})}
                            id="userName"
                            placeholder="alex_dev"
                            type="text"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            id="email"
                            placeholder="you@example.com"
                            type="email"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            id="password"
                            placeholder="••••••••"
                            type="password"
                        />
                    </LabelInputContainer>

                    <button
                        className="relative flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium shadow-md transition hover:opacity-90"
                        type="submit"
                    >
                        {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin"/>}
                        Создать аккаунт →
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Уже есть аккаунт? <Link href="/sign-in" className="text-indigo-600 hover:underline">Войти</Link>
                </p>

                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"/>

                {/* Социальная кнопка */}
                <div className="flex flex-col space-y-3">
                    <SocialButton handleProvider={handleGoogleSignIn} icon={<FaGoogle/>} text="Зарегистрироваться через Google"/>
                </div>
            </div>
        </div>
    )
}

const SocialButton = ({icon, text, handleProvider}: {icon: React.ReactNode, text: string, handleProvider:any}) => (
    <button
        onClick={handleProvider}
        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-zinc-800 dark:text-gray-200"
        type="button"
    >
        {icon} {text}
    </button>
)

const LabelInputContainer = ({children, className}: {children: React.ReactNode, className?: string}) => (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
    </div>
)

export default Signup
