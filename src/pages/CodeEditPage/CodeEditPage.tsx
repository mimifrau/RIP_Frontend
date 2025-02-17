import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteCode,
    fetchCode,
    removeSelectedCode,
    updateCode,
    updateCodeImage
} from "store/slices/codesSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const CodeEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {code} = useAppSelector((state) => state.codes)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(code?.name)

    const [description, setDescription] = useState<string>(code?.description)

    const [decryption, setDecryption] = useState<number>(code?.decryption)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(code?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveCode = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateCodeImage({
                code_id: code.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            decryption
        }

        await dispatch(updateCode({
            code_id: code.id,
            data
        }))

        navigate("/codes-table/")
    }

    useEffect(() => {
        dispatch(fetchCode(id))
        return () => dispatch(removeSelectedCode())
    }, []);

    useEffect(() => {
        setName(code?.name)
        setDescription(code?.description)
        setDecryption(code?.decryption)
        setImgURL(code?.image)
    }, [code]);

    const handleDeleteCode = async () => {
        await dispatch(deleteCode(id))
        navigate("/codes-table/")
    }

    if (!code) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="ФИО" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="text" label="Расшифровка" placeholder="Введите расшифровку" value={decryption} setValue={setDecryption}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveCode}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteCode}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default CodeEditPage