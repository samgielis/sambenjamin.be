import React from "react";
import { Container, Button } from "react-bootstrap";
import "./TagSet.css"
import { getLinkForTag } from "../../../util/URLUtils";
import { Link } from "react-router-dom";

type TagSetProps = {
    tags: string[];
}

export function TagSet(props: TagSetProps) {
    return <Container fluid={true} className="photoset tagset">
            {props.tags.map((tag) => { return <Tag value={tag}></Tag> })}
    </Container>
}

type TagProps = {
    value: string
}

function Tag(props: TagProps) {
    return <Link to={getLinkForTag(props.value)}>
        <Button className={"tag"} variant="secondary">#{props.value}</Button>
    </Link>;
    //return <Button className={"tag"} variant="secondary" href={getLinkForTag(props.value)}>#{props.value}</Button>
}