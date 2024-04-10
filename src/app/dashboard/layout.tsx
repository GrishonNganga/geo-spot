import Header from "../components/dashboard/header";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="container">
            <Header />
            {children}
        </div>
    )
}