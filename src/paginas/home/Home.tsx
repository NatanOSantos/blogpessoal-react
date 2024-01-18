import React, { useState, useEffect } from 'react';

function Home() {
  const [completed, setCompleted] = useState(false);
  const [tarefa, setTarefa] = useState('');

  useEffect(() => {
    if (completed) {
      setTarefa('Parabéns! Você concluiu a tarefa!');
    }
  }, [completed]);

  return (
    <div>
      <h1>Tarefa</h1>
      <h3>{tarefa}</h3>
      <p> Clique para Concluir a tarefa</p>
      <button onClick={() => setCompleted(true)}>Clique para Concluir a tarefa</button>
    </div>
  );
}

export default Home;