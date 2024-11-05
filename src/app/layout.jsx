import "@styles/globals.css";
import "@utils/fontawesome.js";

import Notifications from "@components/Notifications";

export const metadata = {
    title: "YPM",
    description: "YouTube Playlist Manager",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="bg-base-200">
            <body>
                <Notifications />

                {children}
            </body>
        </html>
    );
}
