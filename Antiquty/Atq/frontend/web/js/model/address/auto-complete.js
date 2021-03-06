

define([
    'Antiquty_Atq/js/model/address/type/google'
], function (googleAutoComplete) {
    'use strict';

    var addressType = {
        billing: 'checkout.steps.shipping-step.billingAddress.billing-address-fieldset',
        shipping: 'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset'
    };

    return {
        register: function (type) {
            if (addressType.hasOwnProperty(type)) {
                switch (window.checkoutConfig.oscConfig.autocomplete.type) {
                    case 'google':
                        new googleAutoComplete(addressType[type]);
                        break;
                    case 'pca':
                        break;
                    default :
                        break;
                }
            }
        }
    };
});


