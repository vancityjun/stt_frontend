import './App.scss'
import Dropbox from './component/Dropbox'

const App = () => {
  return (
    <div className="App">
      <div className='container mx-auto px-6 mt-6'>
        <h1 className='text-lg font-medium leading-6'>Speech To Text</h1>
        <Dropbox />
      </div>
    </div>
  );
}

export default App;
