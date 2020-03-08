import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { Story, getStoryID } from "../model/Story";

function StoryRouter(props: StoryPageProps) {
    let match = useRouteMatch();
    const storyRoutes = props.stories.map((story: Story) => {
        return <Route path={`${match.url}/${getStoryID(story)}`}>
            <h1>I am {story.title}</h1>
        </Route>
    })

    const storyLinks = props.stories.map((story: Story) => {
        return <li>
            <Link to={`${match.url}/${getStoryID(story)}`}>{getStoryID(story)}</Link>
        </li>

    })
    return (<Router>
        <div>
            <nav>
                <ul>
                    {storyLinks}
                </ul>
            </nav>
        </div>

        <Switch>
            {storyRoutes}
        </Switch>
    </Router>);
}

export type StoryPageProps = {
    stories: Story[];
}

function StoryPage(props: StoryPageProps) {
    return <StoryRouter stories={props.stories}></StoryRouter>
    /*return (<Router>
        <h1>I am a storypage</h1>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={`${match.url}/kek`}>kek</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/tek`}>tek</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/lek`}>lek</Link>
                    </li>
                </ul>
            </nav>
        </div>

        <Switch>
            <Route path={`${match.url}/kek`}>
                <Kek></Kek>
            </Route>
            <Route path={`${match.url}/tek`}>
                <h2>I am tek</h2>
            </Route>
            <Route path={`${match.url}/lek`}>
                <h2>I am lek</h2>
            </Route>
        </Switch>
    </Router>);*/
}

export default StoryPage;