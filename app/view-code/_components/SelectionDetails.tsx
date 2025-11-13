"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {ArrowLeft, RefreshCcw, StarIcon} from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {FaStar} from "react-icons/fa";
import Link from "next/link";

const geminiModels = [
    { name: "Gemini 2.5 Flash", model: "gemini-2.5-flash" },
    { name: "Gemini 2.0 Flash", model: "gemini-2.0-flash" },
    { name: "Gemini 1.5 Pro", model: "gemini-1.5-pro" },
    { name: "Gemini 1.5 Flash", model: "gemini-1.5-flash" },
];

const SelectionDetails = ({ record, regenerateCode, isReady, loading }: any) => {
    const [description, setDescription] = useState(record?.description || "");
    const [selectedModel, setSelectedModel] = useState(record?.model || "gemini-2.5-flash");

    useEffect(() => {
        if (record) {
            setDescription(record.description);
            setSelectedModel(record.model || "gemini-2.5-flash");
        }
    }, [record]);

    if (!record) return null;

    return (
        <div className="p-5  rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 cursor-pointer">
                <Link href="/dashboard">
                    <ArrowLeft  />
                </Link>

                <h2 className="font-bold my-2">{record?.title ?? "Обычный проект"}</h2>
            </div>

            <Image
                src={record.imageUrl}
                alt="wireframeImage"
                width={300}
                height={300}
                className="rounded-lg object-contain h-[200px] w-full border-dashed p-2 bg-white"
            />

            <h2 className="font-bold mt-4 mb-4">Модель Gemini</h2>
            <Select
                disabled={loading}
                value={selectedModel}
                onValueChange={(val) => setSelectedModel(val)}
            >
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Выберите модель" />
                </SelectTrigger>
                <SelectContent>
                    {geminiModels.map((m) => (
                        <SelectItem key={m.model} value={m.model}>
                            <StarIcon/>
                            {m.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <h2 className="font-bold mt-4 mb-4">Описание</h2>
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                className="bg-white h-[180px]"
            />

            <Button
                disabled={loading}
                onClick={() => regenerateCode({ ...record, description, model: selectedModel })}
               className="w-full mt-4 flex gap-2"
            >
                <RefreshCcw  className={`w-4 h-4 ${loading && "animate-spin"}  `} />
                Регенерировать
            </Button>
        </div>
    );
};

export default SelectionDetails;
