import React from "react";
import { Container, Button } from "react-bootstrap";
import "./TagSet.css"
import { getLinkForTag } from "../../../util/URLUtils";

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
    // return <span className="tag">#{props.value}</span>
    return <Button className={"tag"} variant="secondary" href={getLinkForTag(props.value)}>#{props.value}</Button>
}