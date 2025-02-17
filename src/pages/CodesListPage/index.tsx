import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Code} from "src/modules/types.ts";
import CodeCard from "components/CodeCard";
import {CodeMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";

type Props = {
    codes: T_Code[],
    setCodes: React.Dispatch<React.SetStateAction<T_Code[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    codeName: string,
    setCodeName: React.Dispatch<React.SetStateAction<string>>
}

const CodesListPage = ({codes, setCodes, isMock, setIsMock, codeName, setCodeName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/codes/?code_name=${codeName.toLowerCase()}`)
            const data = await response.json()
            setCodes(data.codes)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setCodes(CodeMocks.filter(code => code.name.toLowerCase().includes(codeName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={codeName} onChange={(e) => setCodeName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {codes?.map(code => (
                    <Col key={code.id} xs="4">
                        <CodeCard code={code} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CodesListPage