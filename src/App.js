import './App.css';
//const Formio = require('formiojs');
import FormBuilder from './components/FormBuilder';
//console.log(Formio);
// window.onload = function () {
//   Formio.Formio.builder(
//     document.getElementById('builder'),
//     {
//       components: [
//         {
//           type: 'textfield',
//           key: 'firstName',
//           label: 'First Name',
//         },
//         {
//           type: 'textfield',
//           key: 'lastName',
//           label: 'Last Name',
//         },
//       ],
//     },
//     {}
//   );
// };
const formDefaultItems = {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
    },
  ],
};
function App() {
  return (
    <div className="App">
      <FormBuilder formComponent={formDefaultItems}></FormBuilder>
    </div>
  );
}

export default App;
