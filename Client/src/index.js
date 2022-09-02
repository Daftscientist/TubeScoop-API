import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Switch from "Routing/Switch";
import 'nprogress/nprogress.css';
import 'tailwind.css'

export default function App() {
  return (
    <BrowserRouter>
      <Switch/>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);