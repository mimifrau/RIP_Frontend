import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftTax,
    fetchTax,
    removeTax, sendDraftTax,
    triggerUpdateMM,
    updateTax
} from "store/slices/taxsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_TaxStatus, T_Code} from "modules/types.ts";
import CodeCard from "components/CodeCard/CodeCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";

const TaxPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const tax = useAppSelector((state) => state.taxs.tax)

    const [name, setName] = useState<string>(tax?.name)

    const [summ, setSumm] = useState<string>(tax?.summ)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchTax(id))
        return () => dispatch(removeTax())
    }, []);

    useEffect(() => {
        setName(tax?.name)
        setSumm(tax?.summ)
    }, [tax]);

    const sendTax = async (e) => {
        e.preventDefault()

        await saveTax()

        await dispatch(sendDraftTax())

        navigate("/taxs/")
    }

    const saveTax = async (e?) => {
        e?.preventDefault()

        const data = {
            name
        }

        await dispatch(updateTax(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteTax = async () => {
        await dispatch(deleteDraftTax())
        navigate("/codes/")
    }

    if (!tax) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = tax.status == E_TaxStatus.Draft
    const isCompleted = tax.status == E_TaxStatus.Completed

    return (
        <Form onSubmit={sendTax} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновое списание" : `Списание №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="ФИО" placeholder="Введите ФИО" value={name} setValue={setName} disabled={!isDraft}/>
                {isCompleted && <CustomInput label="Сумма вычета" value={summ + " "} disabled={true}/>}
            </Row>
            <Row>
                {tax.codes.length > 0 ? tax.codes.map((code:T_Code) => (
                    <Row key={code.id} className="d-flex justify-content-center mb-5">
                        <CodeCard code={code} showRemoveBtn={isDraft} editMM={isDraft} />
                    </Row>
                )) :
                    <h3 className="text-center">Коды не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveTax}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteTax}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default TaxPage