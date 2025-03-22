// import React from 'react';
import { Input } from './components/ui/input.tsx';
import { Button } from './components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card.tsx';
import { Label } from './components/ui/label.tsx';
import CSRFToken from './CSRFToken.tsx';

function Login() {
  return (
    <div className="w-full flex justify-center pt-8">
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action="/accounts/login/"
            method="POST"
            className="flex flex-col gap-2"
          >
            <CSRFToken />
            <div className="flex flex-col gap-2">
              <Label htmlFor="id_email">Email</Label>
              <Input
                id="id_email"
                type="email"
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
            <div>
              <Button variant="default" type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
