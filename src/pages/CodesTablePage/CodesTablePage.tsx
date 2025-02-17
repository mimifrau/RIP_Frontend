import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCodes, updateCodeName} from "store/slices/codesSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import CodesTable from "components/CodesTable/CodesTable.tsx";

const CodesTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {codes, code_name} = useAppSelector((state) => state.codes)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCodeName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCodes())
    }

    useEffect(() => {
        dispatch(fetchCodes())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={code_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/codes/add">
                        <Button color="primary">Создать код</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {codes.length > 0 ? <CodesTable codes={codes} fetchCodes={fetchCodes}/> : <h3 className="text-center mt-5">Коды не найдены</h3>}
            </Row>
        </Container>
    );
};

export default CodesTablePage