import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Story, getStoryCoverImageURL } from '../model/Story';

export type HomePageProps = {
    stories: Story[];
}

function compareStoriesMostRecentFirst(a: Story, b: Story): number {
    if (a.date > b.date) {
        return -1;
    }
    if (b.date > a.date) {
        return 1;
    }
    return 0;
}

export function HomePage(props: HomePageProps) {
    const cols = props.stories.sort(compareStoriesMostRecentFirst).map((story:Story) => {
        return <Col style={{backgroundColor: 'black', color: 'white', height:'500px', backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${getStoryCoverImageURL(story)})`}} md={4}>
            {story.title}
        </Col>
    });
    return (
        <Container fluid={true}>
            <Row>{cols}</Row>
        </Container>
    );
}

