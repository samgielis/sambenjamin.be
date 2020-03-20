import React from 'react';
import { Story } from '../../model/Story';
import { Container } from 'react-bootstrap';
import { StoryGrid } from '../home/children/StoryGrid';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./TagPage.css";
import { trackPageView } from '../../util/Utils';

export type TagPageProps = {
  tag: string
  stories: Story[]
}

class TagPage extends React.Component<TagPageProps, {}> {

  componentDidMount() {
    document.title = `Stories tagged #${this.props.tag} - sambenjamin.be`;
    trackPageView(window.location.pathname + window.location.search);
  }

  render() {
    return <div className="homepage">
            <Container style={{ textAlign: "center", padding: "1rem" }}>
                <h1>#{this.props.tag}</h1>
                <br></br>
                <h4> <Link className="go-home" to="/"><FaArrowLeft /> See more stories</Link></h4>
            </Container>
            <Container fluid={true} style={{ textAlign: "left", }}>
            </Container>

            <StoryGrid stories={this.props.stories}></StoryGrid>
        </div>
  }
}
export default TagPage;