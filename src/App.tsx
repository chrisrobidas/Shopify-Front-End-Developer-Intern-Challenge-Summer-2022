import { useEffect, useRef, useState } from 'react';
import { getAPODEntries } from './api/APODClient';
import APODResults from './components/APODResults';
import { Page, Spinner } from '@shopify/polaris';
import SpacestagramLogo from './ressources/Spacestagram.png';
import { APODEntry } from './api/APODClient';
import './App.scss';

function App() {
  const [entries, _setEntries] = useState<APODEntry[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, _setLoading] = useState(false);

  const entriesRef = useRef(entries);
  const setEntries = (value: APODEntry[]) => {
    entriesRef.current = value;
    _setEntries(value);
  };

  const loadingRef = useRef(loading);
  const setLoading = (value: boolean) => {
    loadingRef.current = value;
    _setLoading(value);
  };

  useEffect(() => {
    async function getNASAEntries() {
      if (loadingRef.current) return;
  
      setLoading(true);
  
      try {
        const result = await getAPODEntries();
        const newEntries = entriesRef.current.concat(result);
        setEntries(newEntries);
      } catch (error) {
        if (error instanceof Error)
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

    getNASAEntries();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='Top-Bar'>
        <div className='Top-Bar-Content'>
          <img className='Logo' src={SpacestagramLogo} alt='Spacestagram'/>
        </div>
      </div>
      <div className='Content-Wrap'>
        <Page>
          {entries && 
            <APODResults entries={entries}/>
          }
          {error &&
            <div className='Centered'>
              <p>An error ocurred, please try reloading the page</p>
            </div>
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
};

export default App;