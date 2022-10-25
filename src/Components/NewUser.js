import React, { useState, useContext, useEffect } from "react";
// , useEffect
import { Button, Card, Form, Col, Row, Container } from "react-bootstrap";
import { UserArray, CityArray, CountryArray, LanguageList, UserArrayStatus } from "../index";
// , LanguageList
// import Axios from "axios";
import Axios from "axios";

function NewUser() {
  const { userList, setUserList } = useContext(UserArray);
  const { cityList } = useContext(CityArray);  
  const { countryList } = useContext(CountryArray);
  const { languageList} = useContext(LanguageList);
  const { userStatus ,setUserStatus } = useContext(UserArrayStatus);
  // , setCityList, setCountryList, setLanguageList 

  const [enteredName, setEnteredName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredCity, setExistingCity] = useState("");
  const [enteredCountry, setExistingCountry] = useState("");
  const [enteredLanguage, setExistingLanguage] = useState("");

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

  const handleLanguage = (e) => {
    const getLanguageId = e.target.value;
    console.log(getLanguageId);
    setExistingLanguage(getLanguageId);
  };

  // let newPerson;

  const submitHandler1 = async (event) => {
    event.preventDefault();
    // newPerson = {
    //   name: enteredName,
    //   phonenumber: enteredPhoneNumber,
    //   cityId: enteredCity,
    //   languageId: enteredLanguage,
    // };

    await Axios
    .post(`https://localhost:7201/api/PeopleAPI`, {
      // Name: newPerson.name,
      // Phonenumber: newPerson.phonenumber,
      // CityId: newPerson.cityId,
      // LanguageId: newPerson.languageId,
      Name: enteredName,
      Phonenumber: enteredPhoneNumber,
      CityId: enteredCity,
      LanguageId: enteredLanguage,
      
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(enteredName, enteredPhoneNumber, enteredCity, enteredLanguage)
    if(userStatus === null){
      setUserStatus(1)
    }

    else {
      let counter = userStatus;
      ++counter;
      setUserStatus(counter);
      // console.log(userStatus);
    }

    setEnteredName("");
    setEnteredPhoneNumber("");
    setExistingCity("");
    setExistingCountry("");
    setExistingLanguage("");  
    
  };

  useEffect(() => {
    const getPeopleData = async () => {
      const response = await Axios.get("https://localhost:7201/api/PeopleAPI")
        .then((res) => {
          setUserList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPeopleData();
  }, [userStatus]);
 
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
            <Row>
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
            </Row>
            <Row>
              <Col></Col>
              <Col>
                <Button
                  className="form-control mt-3 mb-3"
                  variant="primary"
                  type="submit"
                  // value={userStatus}
                  // onChange={event => }
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
