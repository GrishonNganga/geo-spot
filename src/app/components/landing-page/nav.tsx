import Logo from "./logo";

export default function Nav({ children }: { children?: React.ReactNode }) {
    return (
        <div className="pt-5 flex justify-between">
            {children}
        </div>
    )
}

