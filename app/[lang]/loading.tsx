// app/loading.tsx
'use client'

import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-gray-200" />
        </div>
    )
}
