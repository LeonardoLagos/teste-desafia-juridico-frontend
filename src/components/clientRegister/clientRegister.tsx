import { zodResolver } from "@hookform/resolvers/zod";
import { XSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input/Input";
import Button from "../button/Button";
import Modal from "../modal/modal";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const schema = z.object({
    name: z.string().min(1, '* Campo obrigatório'),
    email: z.string().min(1, '* Campo obrigatório').email("* Insira um e-mail válido"),
    telephone: z.string().min(2, '* Campo obrigatório').min(16, '* teste'),
    coordx: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number({
            required_error: "* Campo obrigatório",
            invalid_type_error: "* o valor deve ser numerico"
        })),
    coordy: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number({
            required_error: "* Campo obrigatório",
            invalid_type_error: "* o valor deve ser numerico"
        }))
})

type FormData = z.infer<typeof schema>

const ClientRegister = ({
    setVisible,
    loadClients
}: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    loadClients: () => void
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClose() {
        setVisible((prev) => !prev)
    }

    function onSubmit(data: FormData) {
        handleClose()
        const save = api.put('/clients/register', {
            name: data.name,
            email: data.email,
            telephone: data.telephone,
            coordx: data.coordx,
            coordy: data.coordy
        }).then(() => {
            toast.success('Cliente cadastrado!')
            loadClients()
        }).catch(() => {
            toast.error('Erro ao cadastrar o cliente!')
        })
        toast.promise(
            save,
            {
                pending: 'Cadastrando novo cliente...'
            }
        )
    }

    return (
        <Modal>
            <header className="flex justify-between">
                <p></p>
                <p className="text-primary text-lg md:text-2xl font-bold">
                    Cadastrar um novo cliente</p>
                <button
                    onClick={handleClose}
                ><XSquare /></button>
            </header>
            <form
                className=" pb-3 px-2"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="Nome"
                    placeholder="insira o nome do cliente..."
                    type="text"
                    error={errors.name?.message}
                    register={register("name")}
                />
                <Input
                    name="Email"
                    placeholder="insira o email do cliente..."
                    type="text"
                    error={errors.email?.message}
                    register={register("email")}
                />
                <Input
                    name="Telefone"
                    placeholder="insira o telefone do cliente..."
                    type="telephone"
                    error={errors.telephone?.message}
                    register={register("telephone")}
                />
                <Input
                    name="Coordenada X"
                    placeholder="insira a coordenada X do cliente..."
                    type="number"
                    error={errors.coordx?.message}
                    register={register("coordx")}
                />
                <Input
                    name="Coordenada Y"
                    placeholder="insira a coordenada Y do cliente..."
                    type="number"
                    error={errors.coordy?.message}
                    register={register("coordy")}
                />
                <Button
                    label="Salvar"
                ></Button>
            </form>
        </Modal>
    );
}

export default ClientRegister;