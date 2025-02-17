import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Tax} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";

const TaxsTable = ({taxs}:{taxs:T_Tax[]}) => {
    const navigate = useNavigate()

    const handleClick = (tax_id) => {
        navigate(`/taxs/${tax_id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Сумма вычета',
                accessor: 'summ',
                Cell: ({ value }) => value
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={taxs} onClick={handleClick}/>
    )
};

export default TaxsTable