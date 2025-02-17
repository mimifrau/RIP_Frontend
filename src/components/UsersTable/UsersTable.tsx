import {useMemo} from "react";
import {Button} from "reactstrap";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {api} from "modules/api.ts";

const UsersTable = ({users, fetchUsers}) => {

    const handleMakeAdminButtonClick = async (user_id:string) => {
        await api.users.usersMakeAdminUpdate(user_id)
        fetchUsers()
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Логин',
                accessor: 'username',
                Cell: ({ value }) => value
            },
            {
                Header: 'Админ',
                accessor: 'is_superuser',
                Cell: ({ value }) => value ? "Да" : "Нет"
            },
            {
                Header: "Действие",
                accessor: "make_admin_button",
                Cell: ({ cell }) => (
                    !cell.row.values.is_superuser &&
                    <Button color="primary" onClick={() => handleMakeAdminButtonClick(cell.row.values.id)}>
                        Назначить администратором
                    </Button>
                )
            }
        ],
        []
    )

    if (!users.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={users} />
    )
}

export default UsersTable