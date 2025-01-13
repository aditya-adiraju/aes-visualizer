import { MathJaxContext } from 'better-react-mathjax';
import './App.css'
import MixColumns from './components/MixColumns/MixColumns';

function App() {
    return (
        <MathJaxContext>
            <MixColumns/>
        </MathJaxContext>
    )
}

export default App
