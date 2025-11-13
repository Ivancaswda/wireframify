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
    FoldersIcon, CrownIcon, LogOut, SunMoonIcon, LogInIcon, TabletIcon, Loader2Icon
} from "lucide-react";
import { useTheme } from "next-themes";
import Footer from "@/components/Footer";
import ImageUpload from "@/app/dashboard/_components/ImageUpload";
import {FaMagic} from "react-icons/fa";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import AppHeader from "@/components/AppHeader";

// эффект печатающегося текста
const useTypingEffect = (text: string, speed = 80) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return displayedText;
};

const Page = () => {
    const router = useRouter();
    const { logout, user } = useAuth();
    const { theme, setTheme } = useTheme();

    const welcomeText = 'Добро пожаловать в Wireframify!';
    const typedText = useTypingEffect(welcomeText, 60);
    const testimonials = [
        {
            quote:
                "Wireframify сделал процесс создания интерфейсных блоков быстрым и интуитивным. Я могу экспериментировать с дизайном и сразу видеть результат, что экономит часы работы.",
            name: "Анна Петрова",
            title: "UI/UX дизайнер",
        },
        {
            quote:
                "С помощью Wireframify я могу быстро генерировать чистый HTML и Tailwind код из макетов и прототипов. Это значительно ускоряет разработку проектов.",
            name: "Иван Смирнов",
            title: "Фронтенд-разработчик",
        },
        {
            quote:
                "Инструмент идеально подходит для работы с отдельными компонентами сайта. Wireframify позволяет создавать фрагменты интерфейсов и комбинировать их без лишних усилий.",
            name: "Мария Кузнецова",
            title: "Product Designer",
        },
        {
            quote:
                "Wireframify помогает быстро превратить идеи в рабочие блоки интерфейса. Я могу сосредоточиться на креативе, а не на рутинной верстке.",
            name: "Алексей Иванов",
            title: "Front-end Developer",
        },
        {
            quote:
                "Использование Wireframify сэкономило мне массу времени. Даже сложные макеты превращаются в готовые HTML/Tailwind блоки за считанные минуты.",
            name: "Ольга Сидорова",
            title: "UI Designer",
        },
    ];

    return (
        <div className="flex flex-col mx-auto w-full">

            <AppHeader/>

            {/* HERO */}
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
                <BackgroundRippleEffect />
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center font-bold text-4xl md:text-6xl lg:text-7xl text-neutral-900 dark:text-neutral-100"
                >
                    <span className="text-primary">{typedText}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="relative z-10 mt-6 px-20 text-center text-neutral-600 dark:text-neutral-400 max-w-2xl"
                >
                    Wireframify — это инновационный инструмент, созданный для генерации и редактирования
                    отдельных <span className="text-primary font-semibold">фрагментов сайтов</span> с помощью ИИ.
                    Создавайте элементы интерфейсов, компоненты и блоки, адаптированные под ваш стиль.
                </motion.p>
            </div>

            <hr className="border-neutral-300 dark:border-neutral-700" />

            <section className="px-6 py-20  ">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
                    Как <span className="text-primary">Wireframify</span> работает
                </h2>
                <div className="flex  justify-center items-start gap-8 max-w-5xl mx-auto">
                    {[
                        { icon: "🖼️", title: "Загрузите макет", text: "Добавьте изображение вашего дизайна или wireframe, чтобы начать работу" },
                        { icon: "✍️", title: "Настройка компонентов", text: "Редактируйте текст, изображения и стили прямо в интерфейсе" },
                        { icon: "⚡", title: "Генерация кода", text: "Wireframify автоматически создаёт чистый HTML/Tailwind код" },
                        { icon: "🚀", title: "Интеграция и экспорт", text: "Скачивайте или интегрируйте код в свой проект мгновенно" },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-6   w-[220px] h-[340px] rounded-2xl shadow-md text-center border"
                        >
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>


            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>

            <section className="px-6 py-20  ">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
                    Создайте свой первый <span className="text-primary">фрагмент</span>
                </h2>
                <div className='flex items-center justify-center'>
                    <Link  href="/dashboard" >
                        <Button className="py-6 px-8! text-lg" >
                        <FaMagic/>
                            <span className="ml-2">{'Создать проект'}</span>
                        </Button>
                    </Link>
                </div>


            </section>


            <section className=" mt-[200px] flex flex-col gap-10 ">
                <h1 className="text-3xl md:text-5xl font-bold text-center">
                    Почему выбирают <span className="text-primary">Wireframify</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
                    Мы сосредоточены на создании и улучшении отдельных элементов сайтов.
                    Добавляйте, редактируйте и комбинируйте интерфейсные фрагменты — быстро и удобно.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4">
                    {[
                        { icon: "⚙️", title: "Гибкая настройка", text: "Изменяйте структуру и стили под нужды вашего проекта" },
                        { icon: "🧩", title: "Фрагментная архитектура", text: "Создавайте блоки сайтов, а не только целые страницы" },
                        { icon: "🤖", title: "ИИ-помощник", text: "Wireframify анализирует ваш макет и предлагает готовый код" },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-background rounded-2xl shadow-md text-center border"
                        >
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-muted-foreground">{f.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>




        </div>
    );
};

export default Page;
