import { RefObject, useEffect, useRef, useState } from 'react';
import './APODResult.scss';
import { Card, Heading, Stack } from '@shopify/polaris';
import HeartIconEmpty from '../../../ressources/like_empty.png';
import HeartIconFull from '../../../ressources/like_full.png';

interface APODEntryProps {
    title: string;
    description: string;
    date: string;
    src: string;
    type: string;
}

const APODResult: React.FC<APODEntryProps> = ({
    title,
    description,
    date,
    src,
    type
}) => {
    const [isLiked, setIsLiked] = useState(false);

    const changeIsLiked = () => {
        setIsLiked(!isLiked);
    };

    const componentRef = useRef<HTMLIFrameElement>(null);

    const getWidth = () => {
        if (componentRef.current !== null){
            return componentRef.current.offsetWidth;
        }
        return 0;
    };

    const useContainerWidth = (componentRef: RefObject<HTMLIFrameElement>) => {
        const [width, setWidth] = useState(0);
    
        useEffect(() => {
        const handleResize = () => {
            setWidth(getWidth())
        }
    
        if (componentRef.current) {
            setWidth(getWidth())
        }
    
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        }, [componentRef]);
    
        return width;
    };

    const width = useContainerWidth(componentRef);

    useEffect(() => {
        setIsLiked(JSON.parse(window.localStorage.getItem(src + '_isLiked') || 'false'));
    }, [src]);
    
    useEffect(() => {
        window.localStorage.setItem(src + '_isLiked', isLiked.toString());
    }, [src, isLiked]);

    return (
        <div className='Card-Container'>
            <Card>
                {type === 'image'
                    ? <img className='Result-Media' src={src} alt={title}/>
                    : <iframe title={src} ref={componentRef} height={(width * 9) / 16} className='Result-Media' src={src} allow='fullscreen;'/>
                }
                <Card.Section>
                    <Stack vertical={true}>
                        <div className='Image-Bottom'>
                            <button className='Like-Button' onClick={() => changeIsLiked()}>
                                <img className='Heart-Icon' src={isLiked ? HeartIconFull : HeartIconEmpty} alt='Heart icon'/>
                            </button>
                            <p>{date}</p>
                        </div>
                        <Heading>{title}</Heading>
                        <p>{description}</p>
                    </Stack>
                </Card.Section>
            </Card>
        </div>
    );
}

export default APODResult;