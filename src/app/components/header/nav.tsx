export default function Nav({ children }: { children?: React.ReactNode }) {
    return (
        <div className="py-5 flex items-center justify-between">
            {children}
        </div>
    )
}

