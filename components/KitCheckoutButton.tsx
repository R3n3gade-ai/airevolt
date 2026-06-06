"use client"

import Script from "next/script"

interface KitCheckoutButtonProps {
  productUrl: string
  label: string
  className?: string
}

export default function KitCheckoutButton({ productUrl, label, className }: KitCheckoutButtonProps) {
  return (
    <>
      <Script
        id="kit-commerce-script"
        src="https://digital-arkitects.kit.com/commerce.js"
        async
        defer
        strategy="afterInteractive"
      />
      <a
        className={className ?? "convertkit-button inline-flex justify-center rounded-full bg-[#5B5FED] px-6 py-4 text-base font-bold text-white transition hover:bg-[#4A4EDD]"}
        href={productUrl}
        data-commerce
      >
        {label}
      </a>
    </>
  )
}
