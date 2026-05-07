"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";

const FEATURE_UNDER_DEVELOPMENT = process.env.NEXT_PUBLIC_FEATURE_UNDER_DEVELOPMENT === "true";

export default function TClerkWithTheme({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <ClerkProvider
            appearance={{
                baseTheme: theme === "dark" ? dark : neobrutalism,
                variables: {
                    colorPrimary: "#6c47ff",
                    colorText: theme === "dark" ? "#ffffff" : "#212121",
                    colorBackground: theme === "dark" ? "#212121" : "#ffffff",
                    colorInputBackground: theme === "dark" ? "#2a2a2a" : "#f9f9f9",
                    colorInputText: theme === "dark" ? "#ffffff" : "#212121",
                },
                elements: {
                    // MODAL
                    modalContent: "!relative !border-none !z-[9999] !flex !flex-col !items-center !justify-center !max-w-fit !w-full !mx-auto !my-auto !rounded-2xl !overflow-hidden !p-0 !m-0 dark:!bg-[#1f1f1f]/95 !backdrop-blur-lg !shadow-xl !transition-all !duration-300",

                    modalBackdrop: "!fixed !inset-0 !w-full !h-full !bg-muted/40 !backdrop-blur-sm !z-[9998] !flex !items-center !justify-center !transition-all !duration-300",

                    // HEADERS
                    modalHeader: "!p-6 !pb-2 !border-b !border-gray-200 dark:!border-gray-700",
                    cardHeaderTitle: "!text-2xl !font-bold !text-gray-900 dark:!text-white",
                    cardHeaderSubtitle: "!text-sm !text-gray-500 dark:!text-gray-400",

                    // Logo container
                    logoBox: "!w-24 !h-24 !mx-auto !my-4 !flex !items-center !justify-center !rounded-full !overflow-hidden",

                    // Logo image itself
                    logoImage: "!object-contain !w-full !h-full !rounded-full",

                    // Modal close button
                    modalCloseButton: `
                        !absolute !top-4 !right-4
                        !w-10 !h-10
                        !flex !items-center !justify-center
                        !bg-muted
                        !rounded-full
                        hover:!backdrop-blur-sm hover:!bg-slate-200 dark:hover:!bg-gray-600
                        !text-gray-800 dark:!text-white
                        !transition !duration-200
                    `,

                    // BUTTONS
                    formButtonPrimary:
                        FEATURE_UNDER_DEVELOPMENT
                            ? "!shadow-none !border-0 opacity-50 !pointer-events-none !bg-gray-300 dark:!bg-gray-700"
                            : "!shadow-lg !border-0 !bg-[#6c47ff] hover:!bg-[#5936e0] focus:!bg-[#5936e0] active:!bg-[#4729b8] !text-white !rounded-lg !p-3.5 !transition !duration-200",
                    formButtonSecondary:
                        FEATURE_UNDER_DEVELOPMENT
                            ? "!shadow-none !border-0 opacity-50 !pointer-events-none !bg-gray-300 dark:!bg-gray-700"
                            : "!shadow-none !border-0 !bg-gray-100 hover:!bg-gray-200 dark:!bg-[#2c2c2c] dark:hover:!bg-[#3a3a3a] !text-black dark:!text-white !rounded-lg !p-3.5 !transition !duration-200",
                    formButtonDisabled:
                        "!shadow-none !border-0 opacity-50 !pointer-events-none !bg-gray-300 dark:!bg-gray-700",

                    // INPUTS
                    formFieldInput: "!shadow-sm !border-none focus:!ring-0 focus:!ring-[#6c47ff] !rounded-md !py-3 !px-4 !transition !duration-200 dark:!bg-[#373737] dark:!text-white dark:!placeholder:text-gray-400",
                    formFieldInputError: "!border-red-500",
                    formFieldLabel: "!text-sm !font-medium",
                    formFieldError: "!text-red-500 !mt-1 !text-sm",
                    formFieldCheckboxLabel: "!text-sm",
                    formFieldCheckboxInput: "!rounded-md",

                    // LINKS
                    linkButton: "!underline hover:!no-underline !font-medium",

                    linkButtonPrimary:
                        "!text-[#6c47ff] hover:!text-[#5936e0] focus:!text-[#5936e0] active:!text-[#4729b8] !font-medium",

                    linkButtonSecondary:
                        "!text-gray-800 dark:!text-white hover:!text-gray-600 dark:hover:!text-gray-300 !font-medium",

                    // CARDS
                    cardBox: "!border-none !shadow-none !min-w-100",
                    card: "!border-none !shadow-none !rounded-2xl dark:!bg-[#2a2a2a]",
                    cardContent: "!border-none",
                    cardFooter: "!border-none",

                    // NAV
                    navItem: "!text-sm !font-medium",
                    navItemActive: "!text-[#6c47ff] dark:!text-[#6c47ff] !font-medium",

                    // SOCIAL BUTTONS
                    socialButtonsBlockButton:
                        FEATURE_UNDER_DEVELOPMENT
                            ? "!shadow-none opacity-50 !pointer-events-none !bg-gray-300 dark:!bg-gray-700"
                            : "!shadow-none !border-none !border-[#373737] !bg-blue-100 hover:!bg-blue-100/70 dark:!bg-[#373737] dark:hover:!bg-[#4a4a4a] dark:!bg-[#2a2a2a] dark:hover:!bg-[#3a3a3a] !text-black !rounded-lg !p-3.5 !transition !duration-200",

                    socialButtonsIconButton:
                        FEATURE_UNDER_DEVELOPMENT
                            ? "!shadow-none opacity-50 !pointer-events-none !bg-gray-300 dark:!bg-gray-700"
                            : "!shadow-none !border-none !border-[#373737] !bg-blue-100 hover:!bg-blue-100/70 dark:!bg-[#373737] dark:hover:!bg-[#4a4a4a] dark:!bg-[#2a2a2a] dark:hover:!bg-[#3a3a3a] !text-black !rounded-lg !p-3.5 !transition !duration-200",
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
}