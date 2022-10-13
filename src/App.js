import {Route, Routes} from 'react-router-dom'
// Ruta protegida
import ProtectedRoute from './components/ProtectedRoute';
// Diferentes views
import Login from './views/Login';
import Main from './views/Main';
//Context
import DataProvider from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/main' element={<ProtectedRoute><Main/></ProtectedRoute>}/>
      </Routes>
    </DataProvider>
    
  );
}

export default App;
