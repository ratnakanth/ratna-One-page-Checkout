

define([
    'underscore',
    'Magento_Ui/js/form/element/region',
    'mageUtils',
    'uiLayout'
], function (_, Component, utils, layout) {
    'use strict';
    var template = window.checkoutConfig.oscConfig.isUsedMaterialDesign ? 'Antiquty_Atq/container/form/field' : '${ $.$data.template }';
    var inputNode = {
        parent: '${ $.$data.parentName }',
        component: 'Magento_Ui/js/form/element/abstract',
        template: template,
        elementTmpl: 'Antiquty_Atq/container/form/element/input',
        provider: '${ $.$data.provider }',
        name: '${ $.$data.index }_input',
        dataScope: '${ $.$data.customEntry }',
        customScope: '${ $.$data.customScope }',
        sortOrder: '${ $.$data.sortOrder }',
        displayArea: 'body',
        label: '${ $.$data.label }'
    };

    return Component.extend({
        initInput: function () {
            layout([utils.template(_.extend(inputNode, {additionalClasses: this.additionalClasses}), this)]);

            return this;
        }
    });
});

