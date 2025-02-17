import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Code} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteCode} from "store/slices/codesSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    codes:T_Code[]
}

const CodesTable = ({codes}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (code_id) => {
        navigate(`/codes/${code_id}`)
    }

    const openCodeEditPage = (code_id) => {
        navigate(`/codes/${code_id}/edit`)
    }

    const handleDeleteCode = async (code_id) => {
        dispatch(deleteCode(code_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ cell }) => <img src={`/api/codes/${cell.row?.original.id}/image`} width={100} />
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Расшифровка',
                accessor: 'decryption',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openCodeEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteCode(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!codes.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={codes} onClick={handleClick} />
    )
};

export default CodesTable