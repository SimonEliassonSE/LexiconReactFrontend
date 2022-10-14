import React, { useState, useContext } from "react";
import { Button, Card, Form, Col, Row, Container } from "react-bootstrap";
import { UserArray, CityArray, CountryArray } from "../index";
// , LanguageList
import axios from "axios";

function NewUser() {
  const { userList, setUserList } = useContext(UserArray);
  const { cityList } = useContext(CityArray);
  const { countryList } = useContext(CountryArray);
  // const { languageList } = useContext(LanguageList);

  const [enteredName, setEnteredName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredCity, setExistingCity] = useState("");
  const [enteredCountry, setExistingCountry] = useState("");
  // const [enteredLanguage, setExistingLanguage] = useState("");


  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const phoneNumberChangeHandler = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const handleCountry = (e) => {
    const getCountryId = e.target.value;
    console.log(getCountryId);
    setExistingCountry(getCountryId);
  };

  const handleCity = (e) => {
    const getCityId = e.target.value;
    console.log(getCityId);
    setExistingCity(getCityId);
  };
  // const handleLanguage = (e) => {
  //   const getLanguageId = e.target.value;
  //   console.log(getLanguageId);
  //   setExistingLanguage(getLanguageId);
  // };


  let newPerson;
  let getHigestId = userList[userList.length - 1];
  // console.log(getHigestId);

  const submitHandler1 = (event) => {
    event.preventDefault();
    // Skulle kunna skapa yterligare en context med Language för att ge användaren ett språk.
    newPerson = {
      id: getHigestId.id + 1,
      // id: userList[Array.length-1]
      name: enteredName,
      phonenumber: enteredPhoneNumber,
      cityId: enteredCity,
      // countryId: enteredCountry,
    };

    axios
      .post(`https://localhost:7201/api/PeopleAPI`, {
        Name: newPerson.name,
        Phonenumber: newPerson.phonenumber,
        CityId: newPerson.cityId,
        // Name: "Charlie",
        // Phonenumber: 708090605,
        // CityId: -3,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(newPerson);
    setUserList([...userList, newPerson]);
    console.log(userList);

    setEnteredName("");
    setEnteredPhoneNumber("");
    setExistingCity("");
    setExistingCountry("");
  };

  // axios
  //   .get("https://localhost:7201/api/PeopleAPI")
  //   .then((res) => {
  //     setUserList(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   }, []);

  return (
    <Container className="mb-5 mt-5">
      <Card className="mb-3" style={{ color: "#000" }}>
        <Card.Body>
          <Form onSubmit={submitHandler1}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Name..."
                    required
                    value={enteredName}
                    onChange={nameChangeHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Phonenumber: </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your Phonenumber..."
                    required
                    value={enteredPhoneNumber}
                    onChange={phoneNumberChangeHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <div>
                  <label>Select City</label>
                  <select
                    className="form-control"
                    name="city"
                    onChange={(e) => handleCity(e)}
                  >
                    {cityList.map((getCity, index) => (
                      <option value={getCity.id} key={index}>
                        {getCity.cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col>
                <div>
                  <label>Select Country</label>
                  <select
                    className="form-control"
                    name="country"
                    onChange={(e) => handleCountry(e)}
                  >
                    {countryList.map((getCountry, index) => (
                      <option value={getCountry.id} key={index}>
                        {getCountry.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col>
              <div>
                  <label>Select Country</label>
                  <select
                    className="form-control"
                    name="language"
                    onChange={(e) => handleLanguage(e)}
                  >
                    {languageList.map((getLanguage, index) => (
                      <option value={getLanguage.id} key={index}>
                        {getLanguage.languageName}
                      </option>
                    ))}
                  </select>
              </div>
              </Col>
            </Row> */}
            <Row>
              <Col></Col>
              <Col>
                <Button
                  className="form-control mt-3 mb-3"
                  variant="primary"
                  type="submit"
                >
                  Add new user
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NewUser;
