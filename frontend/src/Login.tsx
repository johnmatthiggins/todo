// import React from 'react';
import { Input } from './components/ui/input.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card.tsx';
import { Label } from './components/ui/label.tsx';

function Login() {
  return (
    <div className="w-full flex justify-center">
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="id_email">Email</Label>
              <Input id="id_email" type="email" className="w-64" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="id_password">Password</Label>
              <Input id="id_password" type="password" className="w-64" />
            </div>
            <div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
