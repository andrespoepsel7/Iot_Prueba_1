import {Route, Routes} from 'react-router-dom'
// Diferentes views
import Login from './views/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
  );
}

export default App;
