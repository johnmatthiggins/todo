import React from 'react';

import getCookie from './getCookie.tsx';

function CSRFToken() {
  const csrfToken: string = React.useMemo(() => {
    return getCookie('csrftoken') || '';
  }, []);
  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
  );
}

export default CSRFToken;
