import { ChevronDown, X } from "lucide-react";

const ClientFilterInput = (props: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    options?: string[];
    placeholder: string;
}) => {
    const { value, setValue, options, placeholder } = props;
    return (
        <div>
            <input
                placeholder={placeholder}
                type="text"
                className="border-2 h-7 border-primary rounded w-full text-sm placeholder:text-primary px-2"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
};

export default ClientFilterInput;