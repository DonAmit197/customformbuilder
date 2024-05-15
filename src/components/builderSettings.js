import formioWebFormBuilder from "./formiojs-settings/formioWebformBuilder";
import builderOptions from "./builder-options/builderOptions";
function builderSettings(builder, _formiojs, components, display, defaultComp, subJSON, jsonElement, formElement) {
    formioWebFormBuilder()
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
            builderOptions,
            {
                baseUrl: 'https://examples.form.io',
            }
        )
        .then(function (instance) {
            builder = instance;
            var onForm = function (form) {
                console.log('Form inside View', form)
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
                //var jsonElement = document.getElementById('json');
                //var formElement = document.getElementById('formio');
                instance.on('change', onBuild);
            };

            instance.ready.then(onReady);
        });
}

export default builderSettings;