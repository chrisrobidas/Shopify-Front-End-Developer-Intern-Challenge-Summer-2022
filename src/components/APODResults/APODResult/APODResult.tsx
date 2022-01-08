import { useState } from "react";
import "./APODResult.scss";
import { Button, Card, Heading, Stack } from '@shopify/polaris';

function APODResult(props: any) {
    const { title, description, date, src } = props;
    const [isLiked, setIsLiked] = useState(false);

    const changeIsLiked = () => {
        setIsLiked(!isLiked);
    };

    return (
        <Card>
            <img className="Result-Image" src={src} alt={title}/>
            <Card.Section>
                <Stack>
                    <Heading>{title} - {date}</Heading>
                    <p>{description}</p>
                    <Button onClick={() => changeIsLiked()} pressed={isLiked}>Like</Button>
                </Stack>
            </Card.Section>
        </Card>
    );
}

export default APODResult;