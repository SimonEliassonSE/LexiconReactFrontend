import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Card,
  Col,
  FormLabel,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserArray, UserDetail, CityArray, CountryArray } from "../index";
import Axios from "axios";

function DetailsPage() {
  const { userDetail } = useContext(UserDetail);
  const { setUserList } = useContext(UserArray);
  const { countryList } = useContext(CountryArray);
  const { cityList } = useContext(CityArray);

  const getCityName = cityList.filter((obj) => {
    return obj.id == userDetail.city;
  });

  let storeCountryId;

  getCityName.map((obj) => {
    storeCountryId = {
      storeCountryId: obj.countryId,
    };
    return storeCountryId;
  });

  console.log(storeCountryId);

  const getCountryName = countryList.filter((obj) => {
    return obj.id === storeCountryId.storeCountryId;
  });

  const handleDelete = () => {
    Axios.delete(`https://localhost:7201/api/PeopleAPI/${userDetail.id}`)
      .then((res) => console.log("Deleting data of id", res))
      .catch((err) => console.log(err));
    // setUserList((current) =>
    //   current.filter((userList) => {
    //     return userList.id !== userDetail.id;
    //   })
    // );
    // Axios.get("https://localhost:7201/api/PeopleAPI")
    // .then((res) => {
    //   setUserList(res.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  console.log(userDetail);
  return (
    <Container className="m-5">
      <Card className="p-2">
        <Row className="mb-2">
          <Col>
            <p>
              User detail for <b>{userDetail.name}</b>
            </p>
          </Col>
        </Row>
        <Form>
          <Row className="mb-2">
            <Col>
              <FormLabel>id: {userDetail.id} </FormLabel>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <FormLabel>Name: {userDetail.name}</FormLabel>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <FormLabel>Phonenumber: {userDetail.phoneNumber}</FormLabel>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              {getCityName.map((obj) => {
                return <FormLabel key={obj.id}>City: {obj.cityName}</FormLabel>;
              })}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              {getCountryName.map((obj) => {
                return (
                  <FormLabel key={obj.id}>Country: {obj.countryName}</FormLabel>
                );
              })}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Link to="/">
                <Button
                  className="mt-2 mb-2 form-control"
                  variant="primary"
                  type="submit"
                >
                  Return to User List
                </Button>
              </Link>
            </Col>
            <Col>
              <Link to="/">
                <Button
                  className="mt-2 mb-2 form-control btn btn-danger"
                  variant="primary"
                  onClick={handleDelete}
                >
                  Delete this User
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default DetailsPage;
