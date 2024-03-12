const Button = ({ label, onClick }: { label: string, onClick?: () => void }) => {
    return (
        <button
            className="mt-2 w-full bg-primary text-white font-medium px-2 py-4 rounded-lg"
            onClick={() => {
                onClick &&
                    onClick()
            }}
        >
            {label}
        </button>
    );
}

export default Button;