import logo from './logo.svg';
import './App.css';
import View from './components/View';
import alchemist from './static/the-alchemist.jpg'
import giver from './static/giver.jpg'

function App() {

  const book1 = {
    name: 'The Alchemist',
    image: alchemist
  };

  const book2 = {
    name: 'The Giver',
    image: giver
  };



  return (
    <div>
      <View book={book1} />
      <View book={book2} />
    </div>
  );
}

export default App;
