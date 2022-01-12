import './App.css';
import Radio from "./Radio";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/style.css";

function App() {
  return (
    <div className="App">
      <h1>Super-Duper Radio player </h1>
      <h2>Pick a genre, choose a station and Start listening</h2>
      <Radio />
    </div>
  );
}

export default App;
