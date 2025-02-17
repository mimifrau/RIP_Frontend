import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Code} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addCodeToTax, fetchCodes} from "store/slices/codesSlice.ts";
import {removeCodeFromDraftTax, updateCodeValue} from "store/slices/taxsSlice.ts";

type Props = {
    code: T_Code,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const CodeCard = ({code,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.taxs)

    const [local_paid, setLocal_paid] = useState(code.paid)
    
    const location = useLocation()

    const isTaxPage = location.pathname.includes("taxs")

    const handeAddToDraftTax = async () => {
        await dispatch(addCodeToTax(code.id))
        await dispatch(fetchCodes())
    }

    const handleRemoveFromDraftTax = async () => {
        await dispatch(removeCodeFromDraftTax(code.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateCodeValue({
            code_id: code.id,
            paid: local_paid
        }))
    }

    if (isTaxPage) {
        return (
            <Card key={code.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={code.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {code.name}
                            </CardTitle>
                            <CardText>
                                Расшифровка: {code.decryption} 
                            </CardText>
                            <CustomInput label="Уплаченная сумма" type="number" value={local_paid} setValue={setLocal_paid} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/codes/${code.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftTax}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={code.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={code.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {code.name}
                </CardTitle>
                <CardText>
                    Расшифровка: {code.decryption} 
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/codes/${code.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftTax}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default CodeCard