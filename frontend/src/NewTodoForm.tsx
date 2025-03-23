import React from 'react';

import { Textarea } from './components/ui/textarea.tsx';
import { Button } from './components/ui/button.tsx';

function NewTodoForm() {
  const [text, setText] = React.useState('');
  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  return (
    <div className="h-full w-full p-2 flex items-center">
      <div className="w-full">
        <h1 className="text-3xl">New TODO</h1>
        <hr className="border border-black border-solid mb-1" />
        <Textarea onInput={handleChange} value={text} />
        <Button
          variant="outline"
          className="bg-orange-400 mt-1"
        >Create</Button>
      </div>
    </div>
  );
}

export default NewTodoForm;
