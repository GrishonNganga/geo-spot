import Logo from "./logo";

export default function Nav({ children }: { children?: React.ReactNode }) {
    return (
        <div className="pt-5 flex justify-between">
            <div>
                <Logo />
            </div>
            {children}
        </div>
    )
}

