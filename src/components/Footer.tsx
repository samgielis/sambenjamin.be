import "./Footer.css"
import React from 'react';
import { Author } from './model/Author';
import { Container } from 'react-bootstrap';
import { Link } from "gatsby";

type FooterProps = {
    author: Author
}

export function Footer(props: FooterProps) {
    return <footer>
        <Container fluid={true}>
            <div className="footer-spacer">
            </div>
            <p>© {new Date().getFullYear()} <Link to='/'>{props.author.name}</Link>
                <br />
        Leuven, Belgium</p>
        </Container>
    </footer>
}