import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import axios from 'axios';
// axios.defaults.baseURL="https://todo-b1t7.onrender.com/api/"
axios.defaults.baseURL="http://localhost:5000/api"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> 
      <BrowserRouter> 
        <App />
      </BrowserRouter>
  </Provider>
);

reportWebVitals();
