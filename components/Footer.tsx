"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaTelegramPlane, FaTwitter, FaDiscord } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-neutral-200 dark:border-neutral-800 ">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

                <div className="flex flex-col items-center md:items-start space-y-3">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Wireframify logo"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />

                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Создавайте и редактируйте фрагменты сайтов с помощью ИИ.
                        Wireframify помогает разработчикам ускорить работу с UI-элементами.
                    </p>
                </div>


                <div className="flex flex-col items-center md:items-start space-y-2">
                    <h3 className="font-semibold text-lg text-primary">Навигация</h3>
                    <Link href="/dashboard" className="hover:text-primary transition">Панель</Link>
                    <Link href="/my-projects" className="hover:text-primary transition">Мои проекты</Link>
                    <Link href="/pricing" className="hover:text-primary transition">Тарифы</Link>
                    <Link href="/about" className="hover:text-primary transition">О проекте</Link>
                </div>

                {/* Соцсети */}
                <div className="flex flex-col items-center md:items-start space-y-3">
                    <h3 className="font-semibold text-lg text-primary">Сообщество</h3>
                    <div className="flex gap-4 text-2xl">
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            href="https://github.com/"
                            target="_blank"
                            className="hover:text-primary transition"
                        >
                            <FaGithub />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            href="https://t.me/"
                            target="_blank"
                            className="hover:text-primary transition"
                        >
                            <FaTelegramPlane />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            href="https://twitter.com/"
                            target="_blank"
                            className="hover:text-primary transition"
                        >
                            <FaTwitter />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            href="https://discord.gg/"
                            target="_blank"
                            className="hover:text-primary transition"
                        >
                            <FaDiscord />
                        </motion.a>
                    </div>
                </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 py-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} <span className="text-primary font-semibold">Wireframify</span>. Все права защищены.
            </div>


            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        </footer>
    );
};

export default Footer;
