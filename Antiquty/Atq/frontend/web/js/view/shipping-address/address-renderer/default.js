

define([
    'Magento_Checkout/js/view/shipping-address/address-renderer/default',
    'Magento_Checkout/js/model/shipping-rate-service',
    'Magento_Checkout/js/model/shipping-rate-registry',
    'Magento_Checkout/js/model/quote'
], function (Component, shippingRateService, rateRegistry, quote) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Antiquty_Atq/container/address/shipping/address-renderer/default'
        },

        /** Set selected customer shipping address  */
        selectAddress: function () {
            if (!this.isSelected()) {
                this._super();

                if (quote.shippingAddress().getType == 'customer-address') {
                    rateRegistry.set(quote.shippingAddress().getKey(), null);
                } else {
                    rateRegistry.set(quote.shippingAddress().getCacheKey(), null);
                }

                shippingRateService.isAddressChange = true;
                shippingRateService.estimateShippingMethod();
            }
        }
    });
});
