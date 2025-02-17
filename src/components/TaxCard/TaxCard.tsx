import {Button, Card, Col, Row} from "reactstrap";
import {E_TaxStatus, T_Tax} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptTax, fetchTaxs, rejectTax} from "store/slices/taxsSlice.ts";

type Props = {
    tax: T_Tax
    index: number
}

const TaxCard = ({tax, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptTax = async (tax_id) => {
        await dispatch(acceptTax(tax_id))
        await dispatch(fetchTaxs())
    }

    const handleRejectTax = async (tax_id) => {
        await dispatch(rejectTax(tax_id))
        await dispatch(fetchTaxs())
    }

    const navigate = useNavigate()

    const openTaxPage = () => {
        navigate(`/taxs/${tax.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[tax.status]}
                </Col>
                <Col md={1}>
                    {tax.summ}
                </Col>
                <Col>
                    {formatDate(tax.date_created)}
                </Col>
                <Col>
                    {formatDate(tax.date_formation)}
                </Col>
                <Col>
                    {formatDate(tax.date_complete)}
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openTaxPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {tax.owner}
                        </Col>
                        <Col>
                            {tax.status == E_TaxStatus.InWork && <Button color="primary" onClick={() => handleAcceptTax(tax.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {tax.status == E_TaxStatus.InWork && <Button color="danger" onClick={() => handleRejectTax(tax.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default TaxCard