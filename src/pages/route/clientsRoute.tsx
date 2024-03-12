import { client } from "pages/home/home"
import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import { api } from "services/api"

const ClientsRoute = () => {
    const [clientData, setClientData] = useState([] as client[])

    useEffect(() => {
        loadClients()
    }, [])

    function loadClients() {
        api.get('/clients/getRoute', {
        }).then((response) => {
            setClientData(response.data)
        })
    }
    const trace = {
        type: 'scatter',
        mode: 'markers+lines',
        x: clientData.map((ponto) => ponto.coordx),
        y: clientData.map((ponto) => ponto.coordy),
        marker: { color: 'red', size: 10 },
    };

    return (
        <div className="flex div w-screen h-screen bg-primary select-none">
            <div className="w-1/4 p-1">
                <div className="h-full bg-white rounded-xl p-1">
                        <div
                            className={`flex w-full border border-primary/10 bg-primary text-white
                        cursor-pointer px-2 justify-between rounded-t-lg`}>
                            <div className="flex gap-4 whitespace-nowrap">
                                <p></p>
                                <p className="max-w-2">{'Nome'}</p>
                            </div>
                            <p>{'Coordenadas'}</p>
                        </div>
                        {clientData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex w-full border-b border-x border-primary/10 hover:bg-primary/5
                            cursor-pointer px-2 justify-between`}>
                                    <div className="flex gap-2 whitespace-nowrap">
                                        <p>{index + 1}</p>
                                        <p className="max-w-2">{item.name}</p>
                                    </div>
                                    <p>{item.coordx + ',' + item.coordy}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div className="w-3/4 p-1">
                <div className="flex h-full bg-white rounded-xl items-center justify-center o p-1">
                    <Plot
                        className="w-full h-full"
                        data={[trace] as any}
                        layout={{}}
                    />
                </div>
            </div>
        </div>
    );
}

export default ClientsRoute;