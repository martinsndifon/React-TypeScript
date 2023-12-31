import { useRef } from 'react';
import Button from './components/UI/Button';
import Container from './components/UI/Container';
import Input from './components/UI/Input';

function App() {
  const input = useRef<HTMLInputElement>(null);
  return (
    <main>
      <Input id='name' label='Your name' type='text' ref={input} />
      <Input id='age' label='Your age' type='number' />

      <p>
        <Button>A Button</Button>
      </p>
      <p>
        <Button href='#'>A Link</Button>
      </p>

      <Container as={Button} onClick={() => {}}>
        Click me
      </Container>
    </main>
  );
}

export default App;
