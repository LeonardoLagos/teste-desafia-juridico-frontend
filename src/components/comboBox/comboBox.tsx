const ComboBox = ({ name, options, value, setValue }: { name: string, options: string[], value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className="flex flex-col mb-2 w-full">
            <p className="text-primary">{name}</p>
            <select
                className="focus:outline-none w-full self-center py-2 rounded-[8px] px-2 border-primary border-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={value || ''}
                onChange={handleSelectChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ComboBox;