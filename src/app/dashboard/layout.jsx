import Navbar from "./_components/Navbar";
import Modals from "./_components/Modals";

export default function DashboardLayout({ children }) {
    return (
        <div className="px-6 md:px-16 py-6 flex flex-col gap-6 relative">
            <Navbar />

            <div>{children}</div>

            <Modals />
        </div>
    );
}
