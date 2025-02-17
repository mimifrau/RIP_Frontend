import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import CodesListPage from "pages/CodesListPage/CodesListPage.tsx";
import CodePage from "pages/CodePage/CodePage.tsx";
import TaxsPage from "pages/TaxsPage/TaxsPage.tsx";
import TaxPage from "pages/TaxPage/TaxPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import CodesTablePage from "pages/CodesTablePage/CodesTablePage.tsx";
import CodeEditPage from "pages/CodeEditPage/CodeEditPage.tsx";
import CodeAddPage from "pages/CodeAddPage/CodeAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/codes/" element={<CodesListPage />} />
                        <Route path="/codes-table/" element={<CodesTablePage />} />
                        <Route path="/codes/:id/" element={<CodePage />} />
                        <Route path="/codes/:id/edit" element={<CodeEditPage />} />
                        <Route path="/codes/add" element={<CodeAddPage />} />
                        <Route path="/taxs/" element={<TaxsPage />} />
                        <Route path="/taxs/:id/" element={<TaxPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
