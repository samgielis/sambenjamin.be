import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';

function StoryPage() {
    let match = useRouteMatch();
    return (<Router>
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
                        <p>{match.path}</p>
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
    </Router>);
}

export default StoryPage;

function Kek() {
    let match = useRouteMatch();

    return (<Router>
        <p>I am a little snitchbitch {match.url}</p>
    </Router>);
}