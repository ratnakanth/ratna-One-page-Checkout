

/*global alert*/
define([
    'jquery',
    'mage/utils/wrapper',
    'Antiquty_Atq/js/action/set-payment-method'
], function ($, wrapper, setPaymentMethodAction) {
    'use strict';

    return function (originalSetPaymentMethodAction) {
        /** Override place-order-mixin for set-payment-information action as they differs only by method signature */
        return wrapper.wrap(originalSetPaymentMethodAction, function (originalAction, messageContainer) {
            return setPaymentMethodAction(messageContainer);
        });
    };
});
