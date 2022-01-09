import { useEffect, useRef, useState } from "react";
import "./APODResult.scss";
import { Button, Card, Heading, Stack } from '@shopify/polaris';

function APODResult(props: any) {
    const { title, description, date, src, type } = props;
    const [isLiked, setIsLiked] = useState(false);

    const changeIsLiked = () => {
        setIsLiked(!isLiked);
    };

    const componentRef = useRef<any>(null);

    const getWidth = () => {
        if (componentRef.current !== null){
            return componentRef.current.offsetWidth;
        }
        return 0;
    };

    const useContainerWidth = (componentRef: any) => {
        const [width, setWidth] = useState(0);
    
        useEffect(() => {
        const handleResize = () => {
            setWidth(getWidth())
        }
    
        if (componentRef.current) {
            setWidth(getWidth())
        }
    
        window.addEventListener("resize", handleResize)
    
        return () => {
            window.removeEventListener("resize", handleResize)
        }
        }, [componentRef]);
    
        return width;
    };

    const width = useContainerWidth(componentRef);

    return (
        <Card>
            {type === "image"
                ? <img className="Result-Media" src={src} alt={title}/>
                : <iframe ref={componentRef} height={(width * 9) / 16} className="Result-Media" src={src} allow="fullscreen;"/>
            }
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