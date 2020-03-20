import "./Footer.css"
import React from 'react';
import { Author } from './model/Author';
import { Container } from 'react-bootstrap';

type FooterProps = {
    author: Author
}

export function Footer(props: FooterProps) {
    return <footer>
        <Container fluid={true}>
            <div className="footer-spacer">
            </div>
            <p>© {new Date().getFullYear()} <a href='/'>{props.author.name}</a>
                <br />
        Leuven, Belgium</p>
        </Container>
    </footer>
}