

define([
    'underscore',
    'jquery',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/url-builder',
    'mage/storage',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_CheckoutAgreements/js/model/agreements-assigner'
], function ($, _, quote, urlBuilder, storage, errorProcessor, customer, fullScreenLoader, agreementsAssigner) {
    'use strict';

    return function (messageContainer) {
        var serviceUrl,
            payload,
            paymentData = _.extend({}, quote.paymentMethod());

        agreementsAssigner(paymentData);

        if(paymentData.method === 'paypal_express'){
            delete  paymentData.__disableTmpl;
        }

        /**
         * Checkout for guest and registered customer.
         */
        if (!customer.isLoggedIn()) {
            serviceUrl = urlBuilder.createUrl('/guest-carts/:cartId/set-payment-information', {
                cartId: quote.getQuoteId()
            });
            payload = {
                cartId: quote.getQuoteId(),
                email: quote.guestEmail,
                paymentMethod: paymentData
            };
        } else {
            serviceUrl = urlBuilder.createUrl('/carts/mine/set-payment-information', {});
            payload = {
                cartId: quote.getQuoteId(),
                paymentMethod: paymentData
            };
        }
        fullScreenLoader.startLoader();

        return storage.post(
            serviceUrl, JSON.stringify(payload)
        ).fail(function (response) {
            errorProcessor.process(response, messageContainer);
        }).always(function () {
            fullScreenLoader.stopLoader();
        });
    };
});
