import { useEffect, useState } from 'react';
import { APODSearchResult, getAPODEntries } from "./api/APODClient";
import APODResults from "./components/APODResults";
import { Page } from '@shopify/polaris';

function App() {
  const [entries, setEntries] = useState<APODSearchResult | undefined>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNASAEntries() {
      setLoading(true);

      try {
        const foundEntries = await getAPODEntries();
        setEntries(foundEntries);
      } catch (error: any) {
        setError(error);
      }

      setLoading(false);
    }
    getNASAEntries();
  }, []);

  return (
    <Page
      title="Spacestagram"
      subtitle="Brought to you by NASA's Astronomy Photo of the Day (APOD) API"
    >
      {entries && 
        <APODResults entries={entries}/>
      }
    </Page>
  );
}

export default App;