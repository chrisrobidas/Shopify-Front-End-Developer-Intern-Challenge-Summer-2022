import { useEffect, useRef, useState } from 'react';
import { getAPODEntries } from "./api/APODClient";
import APODResults from "./components/APODResults";
import { Heading, Page, Spinner, TopBar } from '@shopify/polaris';
import "./App.scss";

function App() {
  const [entries, _setEntries] = useState([]);
  const [error, setError] = useState<Error>();
  const [loading, _setLoading] = useState(false);

  const entriesRef = useRef(entries);
  const setEntries = (value: any) => {
    entriesRef.current = value;
    _setEntries(value);
  };

  const loadingRef = useRef(loading);
  const setLoading = (value: any) => {
    loadingRef.current = value;
    _setLoading(value);
  };

  async function getNASAEntries() {
    if (loadingRef.current) return;

    setLoading(true);

    try {
      const foundEntries = await getAPODEntries();
      const newEntries = entriesRef.current.concat(foundEntries);
      setEntries(newEntries);
    } catch (error: any) {
      setError(error);
    }

    setLoading(false);
  }

  function handleScroll() {
    const isBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight;
    if (isBottom) {
      getNASAEntries();
    }
  }

  useEffect(() => {
    getNASAEntries();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='Top-Bar'>
        <Heading>Spacestagram</Heading>
        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </div>
      <div className='Content-Wrap'>
        <Page>
          {entries && 
            <APODResults entries={entries}/>
          }
          {loading &&
          <div className='Centered'>
            <Spinner/>
          </div>
          }
        </Page>
      </div>
    </>
  );
}

export default App;