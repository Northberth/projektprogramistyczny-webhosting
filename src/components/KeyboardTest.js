import { useRef, useState } from 'react';

const KeyboardTest = () => {
  const [number, setNumber] = useState('');
  const letter = useRef();

  const submit = (e) => {
    e.preventDefault();
    const x = letter.current.value;
    setNumber(x);
  };
  return (
    <>
      <form onSubmit={submit}>
        <input ref={letter} type="string" placeholder="letter" required />
        <button>Test</button>
      </form>
      <p>
        <span>Wprowadzono: {number}</span>
      </p>
    </>
  );
}
export default KeyboardTest;
