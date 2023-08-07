import PiratesTemplate from "../../template/Pirates.template";
import PirateCardComponent from "../../components/PiratesCard.component";
import { Col } from "react-bootstrap";

const PiratesView = (props) => {

    return (
        <PiratesTemplate
            title="Pirate Crew"
            hasButton={true}
            buttonText="Create Pirate"
            buttonAction={() => { console.log("Yohooo") }}
        >
            <Col xs={8}>
                <PirateCardComponent
                    image="https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
                    name="Jack Sparrow"
                    id="1"
                />
                <PirateCardComponent
                    image="https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
                    name="Jack Sparrow"
                    id="1"
                />
                <PirateCardComponent
                    image="https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
                    name="Jack Sparrow"
                    id="1"
                />
                <PirateCardComponent
                    image="https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
                    name="Jack Sparrow"
                    id="1"
                />
                <PirateCardComponent
                    image="https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
                    name="Jack Sparrow"
                    id="1"
                />
                <PirateCardComponent
                    image="https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
                    name="Jack Sparrow"
                    id="1"
                />
            </Col>
        </PiratesTemplate>

        
    )
}

export default PiratesView;