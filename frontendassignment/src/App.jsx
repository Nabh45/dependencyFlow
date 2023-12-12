// components
import ConfigurationManager from "./components/configurationManager"
import ErrorBoundary from "./components/errorBoundary";

function App() {
  return (<ErrorBoundary><ConfigurationManager /></ErrorBoundary>)
}

export default App;


