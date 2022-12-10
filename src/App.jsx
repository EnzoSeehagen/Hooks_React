import './App.css';
import {useState, useEffect} from 'react';

function App() {

const [count, setCount] = useState(0);
const [countB, setCountB] = useState(10);
const [user, setUser] = useState();


// 1- useEffect utilização 
useEffect(() => {
  console.log("Roda a cada renderização aí mano");
});


// 2- array de dependências
useEffect(() => {
  console.log("Você alterou o valor do botão A");
}, [count]);


// 3- array de dependências vazio
useEffect(() => {
  console.log(" só executa quando a página é recarregada")
}, []);


// 4- clean up function (função para limpeza de memória para evitar gargalos no front e travar a aplicação toda)
useEffect(() => {

  const timer = setTimeout(() => {
    console.log(`o incrementador foi alterado ${count} vezes`)

  }, 2000);

  return () => {
    clearTimeout(timer);
  };
  
}, [count]);


// 5- fetch com useEffect (consumir dados de API em componentes)

// ***Exemplo de problemas com o fetch: (cuidado, vai gerar um looping infinito de requisições!)

// fetch("https://api.github.com/users/EnzoSeehagen")
      // .then((resposta) => resposta.json())
     //  .then((json) => setUser(json));


// forma correta de usar o fetch:
useEffect(() => {
  fetch("https://api.github.com/users/EnzoSeehagen")
   .then((resposta) => resposta.json())
   .then((json) => setUser(json));
}, [])


  return(
    <div className='App'>
      <div>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>Botão - A</button>
        <p>{count}</p>
      </div>
      <div>
        <button onClick={() => setCountB(prevCount => prevCount + 1)}>Botão - B</button>
        <p>{countB}</p>
      </div>
      {user && (
        <div>
          <p>Dados do usuário:</p>
          <h1>Nome: {user.name}</h1>
          <p>
            Site: <a href={user.blog}>{user.blog}</a>
          </p>
          <img src={user.avatar_url} alt='foto' />
        </div>
        
      )}
    </div>
  )

}

export default App