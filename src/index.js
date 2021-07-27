import ReactDom from 'react-dom'
import Home from './pages/Home'
import 'reset-css/reset.css'
import 'antd/dist/antd.css';
import './assets/scss/index.scss'

ReactDom.render(
  <Home />,
  document.querySelector('#root')
);