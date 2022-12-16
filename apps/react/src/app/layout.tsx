import { ReactNode } from 'react'

import Provider from './provider'
import 'tailwindcss/tailwind.css'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <head></head>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}
