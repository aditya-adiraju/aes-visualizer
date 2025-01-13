import { MathJaxContext } from 'better-react-mathjax';
import './App.css'
import Page from './components/Page';

function App() {
    return (
        <MathJaxContext>
            <Page />
        </MathJaxContext>
    )
}

export default App
