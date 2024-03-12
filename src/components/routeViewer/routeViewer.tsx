import Button from "components/button/Button";
import Modal from "components/modal/modal";
import { XSquare } from "lucide-react";
import { client } from "pages/home/home";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "services/api";

const RouteViwer = ({
    setVisible
}: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [route, setRoute] = useState([] as client[])
    const navigate = useNavigate()

    useEffect(() => { loadClients() }, [])

    function loadClients() {
        api.get('/clients/getRoute', {
        }).then((response) => {
            setRoute(response.data)
        })
    }

    function handleClose() {
        setVisible((prev) => !prev)
    }

    function handleButton() {
        navigate('/rotas')
    }

    return (
        <Modal>
            <header className="flex justify-between">
                <p></p>
                <p className="text-primary text-lg md:text-2xl font-bold">
                    Rota Otimizada</p>
                <button
                    onClick={handleClose}
                ><XSquare /></button>
            </header>
            <main className="p-2 overflow-auto max-h-[75vh]">
                <div
                    className={`flex w-full border border-primary/10 bg-primary text-white
                        cursor-pointer px-2 justify-between rounded-t-lg`}>
                    <div className="flex gap-4 whitespace-nowrap">
                        <p className="max-w-2">{'Nome'}</p>
                    </div>
                    <p>{'Coordenadas'}</p>
                </div>
                {route.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex w-full border-b border-x border-primary/10 hover:bg-primary/5
                            cursor-pointer px-2 justify-between`}>
                            <div className="flex gap-2 whitespace-nowrap">
                                <p className="max-w-2">{item.name}</p>
                            </div>
                            <p>{item.coordx + ',' + item.coordy}</p>
                        </div>
                    )
                })}
            </main>
            <footer>
                <Button
                    label="Abrir mapa"
                    onClick={() => handleButton()}
                ></Button>
            </footer>
        </Modal>
    );
}

export default RouteViwer;