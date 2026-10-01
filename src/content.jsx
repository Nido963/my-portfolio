import { createContext, useContext, useEffect, useState } from 'react';

const ContentContext = createContext(null);

/** Loads all site content once from the Express API (/api/site). */
export function ContentProvider({ children }) {
  const [state, setState] = useState({ data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/site')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        return res.json();
      })
      .then((data) => !cancelled && setState({ data, error: null }))
      .catch((error) => !cancelled && setState({ data: null, error }));
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.error) {
    return (
      <div className="boot-screen">
        <p>Could not load the site content.</p>
        <p className="boot-screen__hint">Make sure the API is running (npm run dev starts both the site and the API).</p>
      </div>
    );
  }

  if (!state.data) {
    return (
      <div className="boot-screen" aria-busy="true">
        <span className="boot-screen__dot" />
      </div>
    );
  }

  return <ContentContext.Provider value={state.data}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
