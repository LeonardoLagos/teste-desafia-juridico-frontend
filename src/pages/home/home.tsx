import ClientEdit from "components/clientEdit/clientEdit";
import RouteViwer from "components/routeViewer/routeViewer";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import ClientRegister from "../../components/clientRegister/clientRegister";
import ClientFilter from "../../components/clientsFilter/clientsFilter";
import Table from "../../components/table/Table";
import { api } from "../../services/api";

import logo from "../../assets/whiteBrand.svg";
export interface client {
    id: string;
    name: string;
    email: string;
    telephone: string;
    coordx: number;
    coordy: number;
    status: string;
}

const Home = () => {
    const clientFullData = useRef([] as client[])
    const [clientData, setClientData] = useState([] as client[])
    const [registerActive, setRegisterActive] = useState(false)
    const [selectedItem, setSelectedItem] = useState({} as client)
    const [tableItemModalActive, setTableItemModalActive] = useState(false)
    const [routesModalActive, setRoutesModalActive] = useState(false)

    useEffect(() => {
        loadClients()
    }, [])

    function loadClients() {
        api.get('/clients/getAll', {
        }).then((response) => {
            clientFullData.current = response.data
            setClientData(response.data)
        })
    }

    function handleRegister() {
        setRegisterActive((prev) => !prev)
    }

    function handleLoadRoute() {
        setRoutesModalActive((prev) => !prev)
    }

    return (
        <div className="w-screen h-screen select-none">
            <header className="flex bg-primary h-[8%] w-screen p-1 pl-4">
                <img src={logo} alt="logo" />
            </header>
            <main className="w-full p-4">
                <ClientFilter
                    fullData={clientFullData.current}
                    data={clientData}
                    setData={setClientData}
                ></ClientFilter>
                <Table
                    dataRaw={clientFullData.current}
                    itemsPerPage={15}
                    data={clientData}
                    setData={setClientData}
                    setSelectedItem={setSelectedItem}
                    setItemModalActive={setTableItemModalActive}
                ></Table>
                <div className="flex w-full justify-around">
                    <div className="w-2/5">
                        <Button
                            label="Cadastrar novo cliente"
                            onClick={() => { handleRegister() }}
                        />
                    </div>
                    <div className="w-2/5">
                        <Button
                            label="Calcular rota"
                            onClick={() => { handleLoadRoute() }}
                        />
                    </div>
                </div>
            </main>
            {registerActive && <ClientRegister
                setVisible={setRegisterActive}
                loadClients={loadClients}
            ></ClientRegister>}
            { }
            {tableItemModalActive && <ClientEdit
                selectedClient={selectedItem}
                setVisible={setTableItemModalActive}
                loadClients={loadClients}
            ></ClientEdit>}
            {routesModalActive && <RouteViwer
                setVisible={setRoutesModalActive}
            ></RouteViwer>}

        </div>
    );
}
export default Home;