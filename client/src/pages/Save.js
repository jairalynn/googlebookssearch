import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import{ Col, Row, Button, Container } from "react-bootstrap";

function Save() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        API.getBooks()
        .then(res =>
            setBooks(res.data))
            .catch(err => console.log(err));
    };

    function deleteBook(id) {
        API.deleteBook(id)
        .then(res=> loadBooks())
        .catch(err => console.log(err));
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>Saved Books</h1>
                    </Jumbotron>
                    {books.length ? (
                        <List>
                            {books.map(book => (
                                <ListItem key={book._id}>
                                    <Row>
                                        <img src={book.image} alt={book.title} />
                                        <Col size="md-10 md-offset-1">
                                            <article>
                                                <h2>{book.title}</h2>
                                                <h3>by {book.author}</h3>
                                                <h5>Description</h5>
                                                <p>{book.description}</p>
                                            </article>
                                        </Col>
                                    </Row>
                                    <Row>
                                <Button className="btn btn-primary" href={book.link} target="_blank">View</Button>
                                <Button className="btn btn-primary" onClick={() => deleteBook(book._id)}>Delete</Button>
                                </Row>
                                </ListItem>
                            ))}
                            </List>
                         ) : (
                            <h3>No Results to Display</h3>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Save;