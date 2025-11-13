"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorDialogProps {
    open: boolean;
    title?: string;
    message?: string;
    onClose: () => void;
}

const ErrorDialog = ({ open, title = "Ошибка", message, onClose }: ErrorDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-red-500" />
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default" onClick={onClose}>
                        Понял
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ErrorDialog;
