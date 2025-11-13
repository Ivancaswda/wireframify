"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {Coins, Stars} from "lucide-react";
import Image from "next/image";
import {useAuth} from "@/context/useAuth";
import AppHeader from "@/components/AppHeader";

const creditOptions = [
    { credits: 5, price: 500, variantId: "1089671", redirect: () => window.location.href = "https://wireframify.lemonsqueezy.com/buy/37175181-97cd-407e-8f39-c36845c57174" },
    { credits: 10, price: 900, variantId: "1089671", redirect: () => window.location.href = "https://wireframify.lemonsqueezy.com/buy/2a83c091-bc2b-44b9-a605-cbc1817d0e52" },
    { credits: 15, price: 1300, variantId: "12347", redirect: () => window.location.href = "https://wireframify.lemonsqueezy.com/buy/5639e726-cf4e-4322-ba2f-50c1d65918e6" },
    { credits: 20, price: 1600, variantId: "12348", redirect: () => window.location.href = "https://wireframify.lemonsqueezy.com/buy/e57d00bd-35f3-4be7-8094-51dbeece0a21" },
];

export default function PricingPage() {
    const {user} = useAuth()
    return (
        <div className="min-h-screen pb-20 px-4">
            <AppHeader/>
            <div className="max-w-5xl flex flex-col items-center justify-center gap-4 mx-auto text-center mb-16">

                <Image src='/logo.png' width={170} height={170} className="rounded-lg" alt="logo" />
                <h1 className="text-4xl md:text-5xlfont-bold mb-4 ">
                    Выберите свой <span className="">план</span>
                </h1>
                <p className=" text-lg max-w-2xl mx-auto">
                    Покупайте звезды для создания сайтов с помощью Websity.
                    Больше звезд — выгоднее!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {creditOptions.map((plan, i) => (
                    <motion.div
                        key={plan.credits}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Card className="border-2 border-transparent hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl rounded-2xl">
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2 ">
                                    <Stars className="text-primary" /> {plan.credits} звезд
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-2">
                                <p className="text-4xl font-bold ">{plan.price} Руб</p>
                                <p className=" text-sm">
                                    {plan.credits * 10} генераций контента
                                </p>
                                <Button disabled={user?.credits >= 20}
                                    onClick={plan.redirect}
                                >
                                    Купить
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 text-center text-gray-500 text-sm">
                * 1 кредит = 1 генерация контента. Кредиты не сгорают.
            </div>
        </div>
    );
}
