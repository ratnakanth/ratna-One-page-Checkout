

define(
    [
        'Magento_Checkout/js/model/shipping-save-processor',
        'Antiquty_Atq/js/model/shipping-save-processor/checkout'
    ],
    function (shippingSaveProcessor, oscProcessor) {
        'use strict';

        shippingSaveProcessor.registerProcessor('osc', oscProcessor);

        return function () {
            return shippingSaveProcessor.saveShippingInformation('osc');
        }
    }
);
