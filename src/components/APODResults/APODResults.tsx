import React from "react";
import APODResult from "./APODResult";
import { APODEntry } from '../../api/APODClient';

interface APODEntriesListProps {
    entries: APODEntry[];
}

const APODResults: React.FC<APODEntriesListProps> = ({
    entries
}) => {
    return (
        <div>
            {entries.map((entry: APODEntry) => 
                <APODResult key={entry.url} title={entry.title} description={entry.explanation} date={entry.date} src={entry.url} type={entry.media_type}/>
            )}
        </div>
    );
};

export default APODResults;