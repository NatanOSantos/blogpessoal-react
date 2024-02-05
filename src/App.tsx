import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './componentes/contexts/AuthContext'
import Navbar from './componentes/navbar/Navbar'
import Login from './paginas/login/Login'
import Home from './paginas/home/Home'
import Cadastro from './paginas/cadastro/Cadastro'
import ListaTemas from './componentes/temas/ListaTemas'
import FormularioTema from './componentes/temas/FormularioTema'
import DeletarTema from './componentes/temas/DeletarTema'
import Perfil from './paginas/perfil/Perfil'
import Footer from './componentes/footer/Footer'
import ListaPostagem from './componentes/postagens/cardPostagens/deletarPostagem/formularioPostagem/listaPostagem/ListaPostagem'
import FormularioPostagem from './componentes/postagens/cardPostagens/deletarPostagem/formularioPostagem/FormularioPostagem'
import DeletarPostagem from './componentes/postagens/cardPostagens/deletarPostagem/DeletarPostagem'


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path='/cadastro' element={<Cadastro />} />
              <Route path='/login' element={<Login />} />
              <Route path='/temas' element={<ListaTemas />} />
              <Route path='/cadastrartema' element={<FormularioTema />} />
              <Route path='/editartema/:id' element={<FormularioTema />} />
              <Route path='/deletartema/:id' element={<DeletarTema />} />
              <Route path='/perfil' element={<Perfil />} />
              <Route path='/postagens' element={<ListaPostagem />} />
              <Route path='/cadastroPostagem' element={<FormularioPostagem/>}/>
              <Route path='/editarpostagem/:id' element={<FormularioPostagem />} />
              <Route path='/deletarPostagem/:id' element={<DeletarPostagem/>}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App