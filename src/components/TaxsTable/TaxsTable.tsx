import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import TaxCard from "components/TaxCard/TaxCard.tsx";
import {T_Tax} from "modules/types.ts";
import "./TaxTable.css"

type Props = {
    taxs:T_Tax[]
}

const TaxsTable = ({taxs}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col md={1}>
                            Сумма вычета
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {taxs.map((tax, index) => (
                    <TaxCard tax={tax} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default TaxsTable