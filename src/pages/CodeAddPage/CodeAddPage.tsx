import {Button, Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import React, {useEffect, useState} from "react";
import mock from "src/assets/mock.png"
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {createCode} from "store/slices/codesSlice.ts";
import {T_CodeAddData} from "modules/types.ts";

const CodeAddPage = () => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>()

    const [description, setDescription] = useState<string>()

    const [decryption, setDecryption] = useState<number>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const handleCreateCode = async() => {
        if (!name || !description || !decryption) {
            return
        }

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('decryption', decryption as string)

        if (imgFile != undefined) {
            formData.append('image', imgFile, imgFile.name)
        }

        await dispatch(createCode(formData as T_CodeAddData))

        navigate("/codes-table/")
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL as string} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="text" label="Расшифровка" placeholder="Введите расшифровку" value={decryption} setValue={setDecryption}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={handleCreateCode}>Создать</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default CodeAddPage