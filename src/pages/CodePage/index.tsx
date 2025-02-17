import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Code} from "modules/types.ts";
import {CodeMocks} from "modules/mocks.ts";

type Props = {
    selectedCode: T_Code | null,
    setSelectedCode: React.Dispatch<React.SetStateAction<T_Code | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const CodePage = ({selectedCode, setSelectedCode, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/codes/${id}`)
            const data = await response.json()
            setSelectedCode(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedCode(CodeMocks.find(code => code?.id == parseInt(id as string)) as T_Code)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedCode(null)
    }, []);

    if (!selectedCode) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedCode.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedCode.name}</h1>
                    <p className="fs-5">Расшифровка: {selectedCode.decryption}.</p>
                    <p className="fs-5">Описание: {selectedCode.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default CodePage