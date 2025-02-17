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
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

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
                        <Route path="/codes/:id/" element={<CodePage />} />
                        <Route path="/taxs/" element={<TaxsPage />} />
                        <Route path="/taxs/:id/" element={<TaxPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
