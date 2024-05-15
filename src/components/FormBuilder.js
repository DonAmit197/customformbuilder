import { useEffect } from 'react';
import builderSettings from './builderSettings';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';

const Formio = require('bcformiojs');

console.log(Formio);
const _formiojs = Formio.Formio;
var jsonElement = document.getElementById('json');
var formElement = document.getElementById('formio');
var subJSON = document.getElementById('subjson');
/**
 * Form method
 */
function FormBuilder({ formComponent }) {
  console.log(formComponent);
  const defaultComp = formComponent.components;
  useEffect(() => {
    var jsonElement = document.getElementById('json');
    var formElement = document.getElementById('formio');
    var subJSON = document.getElementById('subjson');
    var builder = null;
    var setDisplay = function (display) {
      const components = formComponent.components;
      builderSettings(
        builder,
        _formiojs,
        components,
        display,
        defaultComp,
        subJSON,
        jsonElement,
        formElement
      );

    };

    // Handle the form selection.
    // var formSelect = document.getElementById('form-select');
    // formSelect.addEventListener('change', function () {
    //   setDisplay(this.value);
    // });

    setDisplay('form');
  }, [formComponent]);

  return (
    <>
      <Tabs defaultActiveKey="edit" id="builderTabs" className="mb-3">
        <Tab eventKey="edit" title="Edit">
          {/* <select className="form-control" id="form-select">
            <option value="form">Form</option>
            <option value="wizard">Wizard</option>
            <option value="pdf">PDF</option>
          </select> */}
          <div id="builder"></div> <div id="subjson"></div>
        </Tab>
        <Tab eventKey="view" title="View">
          <div id="formio"></div>
        </Tab>
        <Tab eventKey="json" title="Json">
          <div id="json"></div>
        </Tab>
      </Tabs>
    </>
  );
}
export default FormBuilder;
