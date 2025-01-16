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
        <ProcessShape title="SubBytes()" display="SubBytes"/>
        <ProcessShape title="ShiftRows()" display="ShiftRows"/>
        <ProcessShape title="MixColumns()" display="MixColumns"/>
        <ProcessShape title="XorRoundKey()" display="XorRoundKey"/>
        <StartEndShape title="END" display="NextRound" />
      </FlowChart>
    </MathJaxContext>
  );
}

export default App;
