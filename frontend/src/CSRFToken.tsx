import getCookie from './getCookie.tsx';

function CSRFToken() {
  const csrfToken = React.useMemo(() => {
    return getCookie('csrftoken');
  }, []);
  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
  );
}

export default CSRFToken;
