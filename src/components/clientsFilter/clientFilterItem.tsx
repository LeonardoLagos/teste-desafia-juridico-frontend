import ClientFilterInput from "./clientFilterInput";

const ClientFilterItem = (props: {
    descricao: string;
    placeholder: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    options?: string[];
}) => {
    const { descricao, placeholder, value, setValue, options } = props;

    return (
        <div className="flex flex-col w-full">
            <p className="text-sm">{descricao}</p>
            <ClientFilterInput
                value={value}
                setValue={setValue}
                options={options}
                placeholder={placeholder}
            />
        </div>
    );
};

export default ClientFilterItem;