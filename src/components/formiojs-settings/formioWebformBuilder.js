let _ = require('lodash');
const WebformBuilder = require('bcformiojs/WebformBuilder');
function getElementIndex(element) {
    return Array.prototype.indexOf.call(element.parentNode.children, element);
}

function arrayMove(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;

        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

//const Formio = require('bcformiojs');
function formioWebFormBuilder() {
    console.log('WebformBuilder from formioWebformBuilder.js', WebformBuilder);
    //WebformBuilder.default.prototype.keyboardActionsEnabled = true;
    WebformBuilder.default.prototype.attachComponent = function (
        element,
        component,

    ) {
        // Add component to element for later reference.
        console.log('attachComponent Method', element);
        console.log('This inside Attachcomponent', this);

        /**
         * Set tabIndex to the element to add keyboard event Tab
         */
        element.setAttribute('tabindex', '0');
        const actionBtns = document.createElement('div');
        actionBtns.classList.add('widget-action-btn');
        const btnElem = document.createElement('a');
        btnElem.setAttribute('class', 'moveDn');
        btnElem.setAttribute('class', 'btn-move');
        btnElem.textContent = 'Move Down';
        btnElem.setAttribute('tabindex', '0');
        const upMoveBtn = document.createElement('a');
        upMoveBtn.classList.add('move-up');
        upMoveBtn.setAttribute('tabindex', '0');
        upMoveBtn.setAttribute('class', 'btn-move');
        upMoveBtn.textContent = "Move Up";
        /**
         * Append Move down button
         */
        actionBtns.appendChild(btnElem);
        /**
         * Append Move up button
         */
        actionBtns.appendChild(upMoveBtn)
        /**
         * Attach Action buttons to element
         */
        element.appendChild(actionBtns);
        component.addEventListener(btnElem, 'keydown', (e) => {
            if (e.keyCode === 13) {

                console.log(element.nextElementSibling);
                e.stopPropagation();
                e.preventDefault();
                this.selectedComponent = component;

                const thisElem = element;
                const nextSibling = thisElem.nextElementSibling;
                const grandParent = thisElem.parentNode;
                const currIndex = getElementIndex(thisElem);
                let formioComponents = grandParent.formioComponent.components;

                console.log('Index', currIndex);
                console.log('Grand Parent', [grandParent]);
                console.log('formioComponents', formioComponents)
                let newIdx;
                console.log('Get Parent', this.getParentElement(component.element))
                this.updateComponentPlacement(false);
                grandParent.formioComponent.rebuild();
                if (nextSibling) {
                    //If there is a next sibling, insert the parent element before the next sibling's next sibling

                    // grandParent.insertBefore(thisElem, nextSibling.nextElementSibling);
                    // newIdx = currIndex + 1;
                    // console.log(newIdx);
                    // const componentIndexInFormioComponent = _.findIndex(formioComponents, component);
                    // console.log('Index in Json', componentIndexInFormioComponent)
                    // formioComponents.splice(newIdx, 0, component)

                    // if (newIdx >= 0 && newIdx < formioComponents.length) {


                    // }

                    // e.target.focus();
                    // console.log('COMP_', component, this);

                    //grandParent.formioComponent.rebuild();


                } else {
                    // If there is no next sibling, append the parent element to the grand parent

                    //grandParent.appendChild(thisParent);
                }



            }
        });
        upMoveBtn.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                console.log('Event on Move Up', event);
                const thisParent = event.target.offsetParent.parentNode;
                const prevContainer = thisParent.previousElementSibling;
                console.log('Event on prevContainer', prevContainer);
                const topParent = thisParent.offsetParent;
                console.log('grand father', topParent);
                if (prevContainer) {
                    topParent.insertBefore(thisParent, prevContainer);
                    event.target.focus();
                    /**
                     * Stop this when reaches to bthe first component
                     */
                    // if (!prevContainer.classList.contains('essential-item')) {
                    //   topParent.insertBefore(thisParent, prevContainer);
                    // }

                }


            }
        })
        element.formioComponent = component;

        component.loadRefs(element, {
            removeComponent: 'single',
            editComponent: 'single',
            moveComponent: 'single',
            copyComponent: 'single',
            pasteComponent: 'single',
            editJson: 'single',
        });
        if (component.component.showSidebar === false) {
            component.refs.copyComponent = '';
            component.refs.removeComponent = '';
            //component.refs.editComponent = '';
            component.refs.addButton = '';
            component.refs.editJson = '';
            component.refs.moveComponent = '';

            console.log('Element get', [element]);

            const componentHoverElem = element.querySelector('[data-noattach="true"]');
            element.classList.add('no-drag');
            element.style.cursor = 'auto';
            element.classList.add('essential-item');
            element.querySelector('.widget-action-btn').remove();
            if (componentHoverElem) {
                //componentHoverElem.remove();
                const removeComElem = componentHoverElem.querySelector(
                    '[ref="removeComponent"]'
                );
                const copyComponentElem = componentHoverElem.querySelector(
                    '[ref="copyComponent"]'
                );
                const moveComponentElem = componentHoverElem.querySelector(
                    '[ref="moveComponent"]'
                );
                const editComponentJSONElem =
                    componentHoverElem.querySelector('[ref="editJson"]');
                removeComElem.remove();
                copyComponentElem.remove();
                editComponentJSONElem.remove();
                moveComponentElem.remove();
            }
        }

        if (component.refs.copyComponent) {
            this.attachTooltip(component.refs.copyComponent, this.t('Copy'));

            component.addEventListener(component.refs.copyComponent, 'click', () =>
                this.copyComponent(component)
            );
        }

        if (component.refs.pasteComponent) {
            const pasteToolTip = this.attachTooltip(
                component.refs.pasteComponent,
                this.t('Paste below')
            );

            component.addEventListener(component.refs.pasteComponent, 'click', () => {
                pasteToolTip.hide();
                this.pasteComponent(component);
            });
        }

        if (component.refs.moveComponent) {
            this.attachTooltip(component.refs.moveComponent, this.t('Move'));
            if (this.keyboardActionsEnabled) {
                component.addEventListener(component.refs.moveComponent, 'click', () => {
                    this.moveComponent(component);
                });
            }
        }

        const parent = this.getParentElement(element);

        if (component.refs.editComponent) {
            this.attachTooltip(component.refs.editComponent, this.t('Edit'));

            component.addEventListener(component.refs.editComponent, 'click', () =>
                this.editComponent(
                    component.schema,
                    parent,
                    false,
                    false,
                    component.component,
                    { inDataGrid: component.isInDataGrid }
                )
            );
        }

        if (component.refs.editJson) {
            this.attachTooltip(component.refs.editJson, this.t('Edit JSON'));

            component.addEventListener(component.refs.editJson, 'click', () =>
                this.editComponent(
                    component.schema,
                    parent,
                    false,
                    true,
                    component.component
                )
            );
        }

        if (component.refs.removeComponent) {
            this.attachTooltip(component.refs.removeComponent, this.t('Remove'));

            component.addEventListener(component.refs.removeComponent, 'click', () =>
                this.removeComponent(component.schema, parent, component.component)
            );
        }

        return element;
    };
}
export default formioWebFormBuilder;