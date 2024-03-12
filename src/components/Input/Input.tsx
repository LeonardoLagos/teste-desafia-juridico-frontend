import { Control, Controller, RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";
interface iInputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegisterReturn<any>;
    error: string | undefined;
    rules?: RegisterOptions;
    defaultValue?: string;
    options?: string[]
}

//Componente que cria todos os Inputs do projeto
const Input = ({
    type,
    placeholder,
    name,
    register,
    error,
    defaultValue,
    options
}: iInputProps) => {
    const imputStyle = "focus:outline-none w-full self-center py-2 rounded-[8px] px-2 border-primary border-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] "

    return (
        <>
            <div className={`flex flex-col ${error !== undefined ? '' : 'mb-6'} w-full`}>
                <label className="text-primary">{name}</label>
                {type === "telephone"
                    ? (
                        <InputMask
                            className={imputStyle}
                            mask="(99) 9 9999-9999"
                            maskChar=""
                            defaultValue={defaultValue}
                            {...register}
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            className={imputStyle}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            {...register}
                        />
                    )
                }
                {error && <p className="text-danger">{error}</p>}
            </div>

        </>
    );
}

export default Input