import React from 'react';

type LoggedInUser = {
  name: string,
  email: string,
};

type AuthContextValue = {
  user: LoggedInUser|null,
  loading: boolean,
  refetch: any,
};

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  loading: true,
  refetch: null,
});


export function AuthProvider(props: { children: React.ReactNode }) {
  // the user that is currently logged in...
  const [user, setUser] = React.useState<LoggedInUser|null>(null);
  const [loading, setLoading] = React.useState(true);
  const refetch = React.useCallback(() => {
    setLoading(true);
  }, [setLoading]);
  const fetchUser = React.useCallback(async () => {
    if (loading) {
      const response = await fetch('/current-user/', {
        method: 'GET',
      });
      if (!response.ok) {
        console.error('HTTP request failed...');
        console.error(response);
        return;
      }
      const [data] = await response.json();
      setLoading(false);
      setUser(data ?? null);
    }
  }, [loading]);
  React.useEffect(() => {
    fetchUser();
  }, [loading]);

  const value = React.useMemo(() => {
    return {
      user,
      loading,
      refetch,
    };
  }, [user, loading]);
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
