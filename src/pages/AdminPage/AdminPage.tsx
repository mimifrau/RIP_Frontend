import {useAppDispatch, useAppSelector} from "store/store.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {fetchUsers} from "store/slices/usersSlice.ts";
import UsersTable from "components/UsersTable/UsersTable.tsx";

export const AdminPage = () => {

    const navigate = useNavigate()

    const {is_superuser} = useAppSelector((state) => state.user)

    const users = useAppSelector(state => state.users.users)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const handleFetchUsers = () => dispatch(fetchUsers())

    useEffect(() => {
        handleFetchUsers()
    }, []);

    return (
        <UsersTable users={users} fetchUsers={handleFetchUsers}/>
    )
}

export default AdminPage