import React from 'react';
import { Story } from '../../model/Story';
import { Container } from 'react-bootstrap';
import { StoryGrid } from '../home/children/StoryGrid';

export type TagPageProps = {
  tag: string
  stories: Story[]
}

class TagPage extends React.Component<TagPageProps, {}> {

  componentDidMount() {
    document.title = `Stories tagged #${this.props.tag} - sambenjamin.be`;
  }

  render() {
    return <div className="homepage">
            <Container style={{ textAlign: "center", padding: "1rem" }}>
                <h1>#{this.props.tag}</h1>
            </Container>

            <StoryGrid stories={this.props.stories}></StoryGrid>
        </div>
  }
}
export default TagPage;