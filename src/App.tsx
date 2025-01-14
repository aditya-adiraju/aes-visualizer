import { MathJaxContext } from 'better-react-mathjax';
import './App.css'
import ProcessShape from './components/FlowChart/ProcessShape';
import StartEndShape from './components/FlowChart/StartEndShape';

function App() {
    return (
        <MathJaxContext>
            <ProcessShape title="YES" />
            <br />
            <StartEndShape title='NO' />
        </MathJaxContext>
    )
}

export default App
