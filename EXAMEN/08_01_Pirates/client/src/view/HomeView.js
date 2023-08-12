import { Col, Row} from "react-bootstrap"
import UserRegister from "../components/UserRegister";
import LoginUSer from "../components/UserLogin";

const HomeView = (props) =>{

 return (


        <Row>
            <Col md={6}>
                <UserRegister />            
            </Col>
            <Col md={6}>
                <LoginUSer />            
            </Col>

        </Row>


 )

}
export default HomeView;







