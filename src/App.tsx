import './App.css';
import { WidgetPage } from './pages/WidgetPage';
import { Account } from './shared/ui/Account';

function App() {
  return (
    <div className="App">
      <Account>
        <WidgetPage />
      </Account>
    </div>
  );
}

export default App;
