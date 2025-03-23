import React from 'react';

import { Input } from './components/ui/input.tsx';
import { Button } from './components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from './components/ui/card.tsx';
import { Label } from './components/ui/label.tsx';
import CSRFToken from './CSRFToken.tsx';

function Login() {
  const { errorMessage } = React.useMemo(() => {
    const element = document.getElementById('page_data');
    if (!element?.textContent) {
      return {
        errorMessage: null,
      };
    }
    return JSON.parse(element.textContent);
  }, []);
  return (
    <div className="w-full flex justify-center pt-8">
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>
            Login
          </CardTitle>
            {errorMessage && (
              <CardDescription className="text-red-400">
                {errorMessage}
              </CardDescription>
            )}
        </CardHeader>
        <CardContent>
          <form
            action="/accounts/login/"
            method="POST"
            className="flex flex-col gap-2"
          >
            <CSRFToken />
            <div className="flex flex-col gap-2">
              <Label htmlFor="id_username">Username</Label>
              <Input
                id="id_username"
                type="username"
                name="username"
                className="w-64"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="id_password">Password</Label>
              <Input
                id="id_password"
                type="password"
                name="password"
                className="w-64"
              />
            </div>
            <div className="w-full">
              <Button
                className="bg-orange-300 w-full"
                variant="outline"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
