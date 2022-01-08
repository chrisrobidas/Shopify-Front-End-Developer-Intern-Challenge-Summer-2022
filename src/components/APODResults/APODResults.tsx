import APODResult from "./APODResult";

function APODResults(props: any) {
    const entries = props.entries;

    return (
        <div>
            {entries.map((entry: any) => 
                <APODResult key={entry.url} title={entry.title} description={entry.explanation} date={entry.date} src={entry.url}/>
            )}
        </div>
    );
}

export default APODResults;