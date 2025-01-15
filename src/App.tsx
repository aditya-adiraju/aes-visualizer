import { MathJaxContext } from "better-react-mathjax";
import "./App.css";
import ProcessShape from "./components/FlowChart/ProcessShape";
import StartEndShape from "./components/FlowChart/StartEndShape";
import FlowChart from "./components/FlowChart/FlowChart";

function App() {
  return (
    <MathJaxContext>
      <FlowChart>
        <StartEndShape title="START" display="" />
        <br />
        <ProcessShape title="SubBytes()" display="SubBytes"/>
        <br/>
        <ProcessShape title="ShiftRows()" display="ShiftRows"/>
        <br/>
        <ProcessShape title="MixColumns()" display="MixColumns"/>
        <br/>
        <ProcessShape title="XorRoundKey()" display="XorRoundKey"/>
        <br/>
        <StartEndShape title="END" display="NextRound" />
      </FlowChart>
    </MathJaxContext>
  );
}

export default App;
