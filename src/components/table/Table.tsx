import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { parseNames } from "services/parseNames";

interface TablePagination {
    start: number;
    end: number;
    max: number;
    paginationQnt: number;
}

const Table = ({
    dataRaw,
    itemsPerPage,
    data,
    setData,
    setSelectedItem,
    setItemModalActive
}: {
    dataRaw: any;
    itemsPerPage: number;
    data: any,
    setData: any,
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>,
    setItemModalActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [PaginationData, setPaginationData] = useState<TablePagination>({
        start: 0,
        end: itemsPerPage,
        max: data.length,
        paginationQnt: itemsPerPage,
    } as TablePagination);
    const [properties, setProperties] = useState([] as string[]);




    const [sortedColumn, setSortedColumn] = useState("");
    const [click, setClick] = useState(true);
    useEffect(() => {
        if (dataRaw.length > 0) {
            setProperties((prev) => {
                const obj = Object.keys(dataRaw[0]).filter((item) => {
                    return !item.includes('coord') && item !== 'id';
                });
                return obj;
            });
        }
    }, [dataRaw]);

    useEffect(() => {
        setPaginationData((prev) => {
            let newEnd = prev.paginationQnt;
            if (data.length < prev.paginationQnt) {
                newEnd = data.length;
            }
            return { ...prev, max: data.length, end: newEnd, start: 0 };
        });
    }, [data]);

    useEffect(() => {
        if (sortedColumn !== "") {
            if (click) {
                const newData = [...data];
                const isNumber = typeof newData[0][sortedColumn] === "number";

                newData.sort((a: any, b: any) => {
                    let comparison = 0;

                    if (b[sortedColumn] == null || a[sortedColumn] == null) {
                        return 0;
                    }

                    if (isNumber) {
                        comparison = b[sortedColumn] - a[sortedColumn];
                    } else {
                        const valueA = b[sortedColumn].toUpperCase();
                        const valueB = a[sortedColumn].toUpperCase();
                        if (valueA > valueB) {
                            comparison = 1;
                        } else if (valueA < valueB) {
                            comparison = -1;
                        }
                    }

                    return comparison;
                });
                setData(newData);
            } else {
                const newData = [...data];
                const isNumber = typeof newData[0][sortedColumn] === "number";

                newData.sort((a, b) => {
                    let comparison = 0;

                    if (b[sortedColumn] == null || a[sortedColumn] == null) {
                        return 0;
                    }

                    if (isNumber) {
                        comparison = a[sortedColumn] - b[sortedColumn];
                    } else {
                        const valueA = a[sortedColumn].toUpperCase();
                        const valueB = b[sortedColumn].toUpperCase();
                        if (valueA > valueB) {
                            comparison = 1;
                        } else if (valueA < valueB) {
                            comparison = -1;
                        }
                    }
                    return comparison;
                });
                setData(newData);
            }
        }
    }, [sortedColumn, click]);

    const handlePaginationPrevious = () => {
        setPaginationData((prev) => {
            let newStart = 0;
            let newEnd = 0;
            if (prev.start === 0) {
                if (prev.max < prev.paginationQnt) {
                    newEnd = prev.max;
                    return { ...prev, end: newEnd };
                }
                newEnd = prev.paginationQnt;
                return { ...prev, end: newEnd };
            };

            if (prev.end === prev.max) {
                newStart = prev.start -= prev.paginationQnt;
                newEnd = prev.start + prev.paginationQnt;
                return { ...prev, start: newStart, end: newEnd };
            }

            newStart = prev.start - prev.paginationQnt;
            newEnd = prev.end - prev.paginationQnt;
            return { ...prev, start: newStart, end: newEnd };
        });
    };

    const handlePaginationNext = () => {
        setPaginationData((prev) => {
            let newStart = 0;
            let newEnd = 0;
            if (prev.end + prev.paginationQnt > prev.max) {
                newStart =
                    prev.start + prev.paginationQnt > prev.max
                        ? prev.start
                        : prev.start + prev.paginationQnt;

                newEnd = prev.max;
                return { ...prev, start: newStart, end: prev.max };
            }

            newStart = prev.start + prev.paginationQnt;
            newEnd = prev.end + prev.paginationQnt;
            return { ...prev, start: newStart, end: newEnd };
        });
    };

    const handleSort = (key: any) => {
        setSortedColumn(key);
    };

    function handleItemClick(item: any) {
        setSelectedItem(item)
        setItemModalActive((prev) => !prev)
    }

    return (
        <div className="flex flex-col h-full">
            <div className={`overflow-auto shadow-xl rounded-lg border border-primary/80`}>
                <table className="w-full table-auto rounded-[200px]">
                    <thead className="sticky top-0 bg-primary text-white rounded-[200px]">
                        <tr>
                            {properties.map((key, index) => {
                                return (
                                    <th
                                        className={`px-4 py-2 whitespace-nowrap font-medium text-sm text-left
                                            border-primary/10 `}
                                        key={index}
                                        onClick={() => {
                                            handleSort(key);
                                            setClick(!click);
                                        }}
                                    >
                                        <div
                                            className="flex items-center justify-left gap-3"
                                            key={index}
                                        >
                                            {parseNames(key)}
                                            {sortedColumn === key && click ? (
                                                <ArrowDown size={20} />
                                            ) : sortedColumn === key && !click ? (
                                                <ArrowUp size={20} />
                                            ) : (
                                                <ArrowDownUp size={16} />
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: any, index: number) => {
                            if (index < PaginationData.start || index >= PaginationData.end)
                                return;
                            return (
                                <tr
                                    className=" hover:bg-primary/5"
                                    key={index}
                                    onClick={() => handleItemClick(row)}
                                >
                                    {properties.map((key, index) => {
                                        return (
                                            <td
                                                className={`whitespace-nowrap px-4 py-[0.40rem] border-t border-primary/10 
                                                text-left text-sm font-light`}
                                                style={{
                                                    fontFamily: "Arial, monospace",
                                                }}
                                                key={row[key] + index}
                                            >
                                                {row[key]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {PaginationData && (
                <div className="flex flex-col items-end">
                    <div className="flex items-center mt-1">
                        <p>
                            {PaginationData.start + 1}-{PaginationData.end}
                            {" de "}
                            {PaginationData.max}
                            {" registros"}
                        </p>
                        <button
                            className="px-3 py-1 mx-1 rounded-full hover:bg-black/10"
                            onClick={() => handlePaginationPrevious()}
                        >
                            {"<"}
                        </button>
                        <button
                            className="px-3 py-1 mx-1 rounded-full hover:bg-black/10"
                            onClick={() => handlePaginationNext()}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;