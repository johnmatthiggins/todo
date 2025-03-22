import React from 'react';

import AuthContext from './AuthContext.tsx';

function Home() {
  const {
    loading,
    refetch,
  } = React.useContext(AuthContext);
  return (
    <div className="w-full">
      <h1 className="text-4xl">Hello from React.js!</h1>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 rounded-md"
          onClick={() => refetch()}>
          Refetch
        </button>
        {loading && (
        <span>The page is loading!!!</span>
        )}
      </div>
    </div>
  );
}

export default Home;
