import { useRef } from 'react';
import Input from './components/UI/Input';
import Form, { type FormHandle } from './components/UI/Form';
import Button from './components/UI/Button';

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    // const extractedData = data as { name: string; age: string };
    if (
      !data ||
      typeof data !== 'object' ||
      !('name' in data) ||
      !('age' in data)
    ) {
      return;
    }
    console.log(data);
    customForm.current?.clear();
  }

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        <Input type='text' label='name' id='name' />
        <Input type='number' label='age' id='age' />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
