/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
    // Setting our component's initial state
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})
    const [bookResults, setBookResults] = useState({})

    //save books
    function saveBook(id, title, authors, description, image, link) {
        API.saveBook({
            key: id,
            title: title,
            authors: authors,
            description: description,
            image: image,
            link: link,
        })
            .then(res => console.log())
            .catch(err => console.log(err));
    }

    //handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    //When the form is submitted, use the API.saveBook method to save the book data then reload books from database
    function handleFormSubmit(event) {
        event.preventDefault();
        API.searchBook(formObject.title)
            .then((res) => {
                console.log(res.data.items)
                setBookResults(res.data.items)
            })
            .catch((err) => console.log(err));
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                        />
                        <FormBtn disabled={!formObject.title} onClick={handleFormSubmit}>
                            Submit Book
              </FormBtn>
                    </form>
                </Col>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Book Results</h1>
                    </Jumbotron>
                    {bookResults.length ? (
                        <List>
                            {bookResults.map((book) => {
                                let id = "";
                                id = book.id;
                                let title = "";
                                if (book.volumeInfo.title === undefined) {
                                    title = "No Title";
                                } else {
                                    title = book.volumeInfo.title;
                                }
                                let authors = [];
                                if (book.volumeInfo.authors === undefined) {
                                    authors = ["No Author"];
                                } else {
                                    authors = book.volumeInfo.authors;
                                }
                                let description = "";
                                if (book.volumeInfo.description) {
                                    description = book.volumeInfo.description;
                                } else {
                                    description = "No description.";
                                }
                                let image = "";
                                if (book.volumeInfo.imageLinks === undefined) {
                                    image = "No Image";
                                } else {
                                    image = book.volumeInfo.imageLinks.thumbnail;
                                }
                                let link = "";
                                if (book.volumeInfo.infoLink) {
                                    link = book.volumeInfo.infoLink;
                                } else {
                                    link = "";
                                } return (
                                    <ListItem key={id}>
                                        <strong>
                                            {title} by {authors}
                                        </strong>
                                        <h2>Description</h2>
                                        <p>{description}</p>
                                        <img src={image}></img>
                                        <Button href={link}>View Book</Button>
                                        <Button onClick={() => saveBook(id, title, authors, description, image, link)
                                        }> Save Book </Button>
                                    </ListItem>
                                );
                            })}

                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    );
}
export default Search;