import { useEffect } from 'react';
const Formio = require('formiojs');

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
      if (builder) {
        builder.destroy();
        document.getElementById('builder').innerHTML = '';
      }
      _formiojs
        .builder(
          document.getElementById('builder'),
          {
            display: display,
            components: defaultComp,
            settings: {
              pdf: {
                id: '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
                src: 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
              },
            },
          },
          {
            baseUrl: 'https://examples.form.io',
          }
        )
        .then(function (instance) {
          builder = instance;
          var onForm = function (form) {
            form.on('change', function () {
              subJSON.innerHTML = '';
              subJSON.appendChild(
                document.createTextNode(
                  JSON.stringify(form.submission, null, 4)
                )
              );
            });
          };

          var onBuild = function (build) {
            jsonElement.innerHTML = '';
            formElement.innerHTML = '';
            jsonElement.appendChild(
              document.createTextNode(JSON.stringify(instance.schema, null, 4))
            );
            _formiojs.createForm(formElement, instance.form).then(onForm);
          };

          var onReady = function () {
            var jsonElement = document.getElementById('json');
            var formElement = document.getElementById('formio');
            instance.on('change', onBuild);
          };

          instance.ready.then(onReady);
        });
    };

    // Handle the form selection.
    var formSelect = document.getElementById('form-select');
    formSelect.addEventListener('change', function () {
      setDisplay(this.value);
    });

    setDisplay('form');
  }, [formComponent]);

  return (
    <>
      <select className="form-control" id="form-select">
        <option value="form">Form</option>
        <option value="wizard">Wizard</option>
        <option value="pdf">PDF</option>
      </select>
      <div id="builder"></div> <div id="subjson"></div>
      <div id="json"></div>
      <div id="formio"></div>
    </>
  );
}
export default FormBuilder;