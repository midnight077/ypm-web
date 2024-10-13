import "@styles/globals.css";
import "@utils/fontawesome.js";

export const metadata = {
    title: "YPM",
    description: "YouTube Playlist Manager",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
