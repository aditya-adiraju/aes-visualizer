import { MathJaxContext } from 'better-react-mathjax';
import './App.css'
import Page from './components/Page';
import Circle from './components/FlowChart/Circle';

function App() {
    return (
        <MathJaxContext>
            <Circle />
        </MathJaxContext>
    )
}

export default App
