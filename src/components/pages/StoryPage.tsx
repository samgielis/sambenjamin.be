import React from 'react';
import { Story, getStoryID } from "../model/Story";

export type StoryPageProps = {
    stories: Story[];
}

function StoryPage(props: StoryPageProps) {
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