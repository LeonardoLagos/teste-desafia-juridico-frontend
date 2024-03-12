import { useEffect, useState } from "react";
import { client } from "../../pages/home/home";
import ClientFilterItem from "./clientFilterItem";

const ClientFilter = (props: { fullData: client[], data: any, setData: React.Dispatch<React.SetStateAction<any>> }) => {
    const { fullData, data, setData } = props;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [status, setStatus] = useState('')

    const [listName, setListName] = useState([''] as string[])
    const [listEmail, setListEmail] = useState([''] as string[])
    const [listTelephone, setListTelephone] = useState([''] as string[])
    const [listStatus, setListStatus] = useState([''] as string[])

    const insertData = (data: any) => {
        // if (name === null) {
        //     setListName(data.map((data: client) => { return data.name }).filter((value: string, index: number, self: any) => {
        //         return self.indexOf(value) === index;
        //     }).sort())
        // }

        if (email === null) {
            setListEmail(data.map((data: client) => { return data.email }).filter((value: string, index: number, self: any) => {
                return self.indexOf(value) === index;
            }).sort())
        }

        if (telephone === null) {
            setListTelephone(data.map((data: client) => { return data.telephone }).filter((value: string, index: number, self: any) => {
                return self.indexOf(value) === index;
            }).sort())
        }

        if (status === null) {
            setListStatus(data.map((data: client) => { return data.status }).filter((value: string, index: number, self: any) => {
                return self.indexOf(value) === index;
            }).sort())
        }
    }

    const handleSearch = () => {
        let searchData = fullData
        if (name)
            searchData = searchData.filter((value: client) => {
                return value.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
            })

        if (email)
            searchData = searchData.filter((value: client) => {
                return value.email.toLocaleLowerCase().includes(email.toLocaleLowerCase());

            })

        if (telephone)
            searchData = searchData.filter((value: client) => {
                return value.telephone.toLocaleLowerCase().includes(telephone.toLocaleLowerCase());
            })

        if (status)
            searchData = searchData.filter((value: client) => {
                return value.status === status;
            })

        setData(searchData)
        insertData(searchData)
    }

    useEffect(() => {
        handleSearch()
    }, [name, email, telephone, status])

    return (
        <div className="flex overflow-auto py-2 text-primary font-bold justify-between gap-4">
            <ClientFilterItem
                descricao="Nome"
                placeholder="Insira um nome..."
                value={name}
                setValue={setName} />
            <ClientFilterItem
                descricao="Email"
                placeholder="Insira um email..."
                value={email}
                setValue={setEmail}
                options={listEmail} />
            <ClientFilterItem
                descricao="Telefone"
                placeholder="Insira um telefone..."
                value={telephone}
                setValue={setTelephone}
                options={listTelephone} />
            <ClientFilterItem
                descricao="Status"
                placeholder="Defina um status..."
                value={status}
                setValue={setStatus}
                options={listStatus} />
        </div>
    );
}
export default ClientFilter;