

define([
    'underscore',
    'ko',
    'mageUtils',
    'Magento_Checkout/js/view/payment/list',
    'Magento_Checkout/js/model/payment/method-list',
    'Magento_Checkout/js/model/payment/renderer-list',
    'uiLayout',
    'Magento_Checkout/js/model/checkout-data-resolver',
    'mage/translate',
    'uiRegistry'
], function (_, ko, utils, Component, paymentMethods, rendererList, layout, checkoutDataResolver, $t, registry) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Antiquty_Atq/payment-methods/list',
        },

        /**
         * Create renderer.
         *
         * @param {Object} paymentMethodData
         */
        createRenderer: function (paymentMethodData) {
            if (paymentMethodData.method === 'paypal_express') {
                var isRendererForMethod = false,
                    currentGroup;
                var isContextCheckout = window.checkoutConfig.payment.paypalExpress.isContextCheckout;
                if(isContextCheckout) {
                    var paypalExpress = 'Antiquty_Atq/js/view/payment/method-renderer/in-context/checkout-express';
                }

                registry.get(this.configDefaultGroup.name, function (defaultGroup) {
                    _.each(rendererList(), function (renderer) {

                        if (renderer.hasOwnProperty('typeComparatorCallback') &&
                            typeof renderer.typeComparatorCallback == 'function'
                        ) {
                            isRendererForMethod = renderer.typeComparatorCallback(renderer.type, paymentMethodData.method);
                        } else {
                            isRendererForMethod = renderer.type === paymentMethodData.method;
                        }

                        if (isRendererForMethod) {
                            currentGroup = renderer.group ? renderer.group : defaultGroup;

                            this.collectPaymentGroups(currentGroup);

                            layout([
                                this.createComponent(
                                    {
                                        config: renderer.config,
                                        component: paypalExpress,
                                        name: renderer.type,
                                        method: paymentMethodData.method,
                                        item: paymentMethodData,
                                        displayArea: currentGroup.displayArea
                                    }
                                )]);
                        }
                    }.bind(this));
                }.bind(this));
            }
        },
    });
});
