import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContatoList from './components/contato/contato-list';
import ContatoForm from './components/contato/contato-form';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/contatos" element={ <ContatoList /> } />
          <Route path="/contatos/novo" element={ <ContatoForm onAddContato={() => {}} /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
