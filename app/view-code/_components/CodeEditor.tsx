"use client";
import React from "react";
import {
    Sandpack,
    SandpackCodeEditor,
    SandpackLayout,
    SandpackProvider,
} from "@codesandbox/sandpack-react";
import { DEPENDANCY } from "@/app/constants";
import { aquaBlue } from "@codesandbox/sandpack-themes";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const CodeEditor = ({ codeResponse, isReady }: any) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeResponse);
            setCopied(true);
            toast.success("Код скопирован!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Не удалось скопировать код");
        }
    };

    return (
        <div className="relative">
            {/* ✅ Кнопка копирования */}
            <div className="flex justify-end mb-3">
                <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    {copied ? (
                        <>
                            <CheckIcon className="w-4 h-4 text-green-600" />
                            Скопировано
                        </>
                    ) : (
                        <>
                            <CopyIcon className="w-4 h-4" />
                            Копировать код
                        </>
                    )}
                </Button>
            </div>

            {/* ✅ Сам редактор */}
            {isReady ? (
                <Sandpack
                    theme={aquaBlue}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                        showNavigator: true,
                        showTabs: true,
                        editorHeight: 600,
                    }}
                    customSetup={{
                        dependencies: {
                            ...DEPENDANCY,
                        },
                    }}
                    files={{
                        "/App.js": `${codeResponse}`,
                    }}
                    template="react"
                />
            ) : (
                <SandpackProvider
                    theme={aquaBlue}
                    template="react"
                    files={{
                        "/app.ts": {
                            code: `${codeResponse}`,
                            active: true,
                        },
                    }}
                    customSetup={{
                        dependencies: {
                            ...DEPENDANCY,
                        },
                    }}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                    }}
                >
                    <SandpackLayout>
                        <SandpackCodeEditor showTabs={true} style={{ height: "70vh" }} />
                    </SandpackLayout>
                </SandpackProvider>
            )}
        </div>
    );
};

export default CodeEditor;
