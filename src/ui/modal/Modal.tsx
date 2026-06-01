import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"

import type { ReactNode } from "react"

type ModalProps = {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    className="
                        w-full
                        max-w-4xl
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-950
                        p-6
                        shadow-xl
                    "
                >
                    <div className="mb-4 flex items-center justify-between">
                        {title && (
                            <h2 className="text-lg font-semibold">{title}</h2>
                        )}

                        <button
                            onClick={onClose}
                            className="
                                rounded-md
                                px-3
                                py-1
                                text-zinc-400
                                hover:bg-zinc-800
                                hover:text-white
                            "
                        >
                            ✕
                        </button>
                    </div>

                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
