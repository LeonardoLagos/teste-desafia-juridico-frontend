import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/Input/Input";
import Button from "components/button/Button";
import ComboBox from "components/comboBox/comboBox";
import Modal from "components/modal/modal";
import { XSquare } from "lucide-react";
import { client } from "pages/home/home";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "services/api";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, '* Campo obrigatório'),
    email: z.string().min(1, '* Campo obrigatório').email("* Insira um e-mail válido"),
    telephone: z.string().min(2, '* Campo obrigatório'),
    coordx: z.preprocess((a) => parseInt((a as string), 10),
        z.number({
            required_error: "* Campo obrigatório",
            invalid_type_error: "* o valor deve ser numerico"
        })),
    coordy: z.preprocess((a) => parseInt((a as string), 10),
        z.number({
            required_error: "* Campo obrigatório",
            invalid_type_error: "* o valor deve ser numerico"
        }))
})

type FormData = z.infer<typeof schema>
const ClientEdit = ({
    selectedClient,
    setVisible,
    loadClients
}: {
    selectedClient: client,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    loadClients: () => void
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: selectedClient.name,
            email: selectedClient.email,
            telephone: selectedClient.telephone,
            coordx: selectedClient.coordx,
            coordy: selectedClient.coordy
        }
    })
    const [status, setStatus] = useState(selectedClient.status)

    function handleClose() {
        setVisible((prev) => !prev)
    }

    function onSubmit(data: FormData) {
        handleClose()
        const save = api.post('/clients/update', {
            id: selectedClient.id,
            name: data.name,
            email: data.email,
            telephone: data.telephone,
            coordx: data.coordx,
            coordy: data.coordy,
            status: status
        }).then(() => {
            toast.success('Cadastro atualizado com sucesso!')
            loadClients()
        }).catch(() => {
            toast.error('Erro ao atualizar o cadastro!')
        })
        toast.promise(
            save,
            {
                pending: 'Atualizando cadastro...'
            }
        )
    }

    return (
        <Modal>
            <header className="flex justify-between">
                <p></p>
                <p className="text-primary text-lg md:text-2xl font-bold">
                    Atualizar cadastro do cliente</p>
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
                    defaultValue={selectedClient.telephone}
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
                <ComboBox
                    name={"Status"}
                    options={['Ativo', 'Inativo']}
                    value={status}
                    setValue={setStatus}
                />
                <Button
                    label="Salvar"
                ></Button>
            </form>
        </Modal>
    );
}

export default ClientEdit;