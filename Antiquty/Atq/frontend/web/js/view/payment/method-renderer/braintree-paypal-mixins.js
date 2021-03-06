

define([
    'jquery',
    'Antiquty_Atq/js/action/set-checkout-information',
    'Antiquty_Atq/js/model/braintree-paypal',
    'Magento_Checkout/js/model/payment/additional-validators',
    'Magento_Checkout/js/model/quote',
    'underscore',
    'uiRegistry'
], function ($, setCheckoutInformationAction, braintreePaypalModel, additionalValidators, quote, _, registry) {
    'use strict';
    return function (BraintreePaypalComponent) {
        return BraintreePaypalComponent.extend({
            /**
             * Set list of observable attributes
             * @returns {exports.initObservable}
             */
            initObservable: function () {
                var self = this;

                this._super();
                // For each component initialization need update property
                this.isReviewRequired = braintreePaypalModel.isReviewRequired;
                this.customerEmail = braintreePaypalModel.customerEmail;
                this.active = braintreePaypalModel.active;

                return this;
            },

            /**
             * Get shipping address
             * @returns {Object}
             */
            getShippingAddress: function () {
                var address = quote.shippingAddress();
                if (!address) {
                    address = {};
                }
                if (!address.street) {
                    address.street = ['', ''];
                }
                if (address.postcode === null) {
                    return {};
                }

                return {
                    recipientName: address.firstname + ' ' + address.lastname,
                    streetAddress: address.street[0],
                    locality: address.city,
                    countryCodeAlpha2: address.countryId,
                    postalCode: address.postcode,
                    region: address.regionCode,
                    phone: address.telephone,
                    editable: this.isAllowOverrideShippingAddress()
                };
            },

            // Compatible with PayPal Through Braintree on M231
            reInitPayPal: function () {
                var placeOrder = registry.get('checkout.sidebar.place-order-information-right.place-order-button');
                if (!placeOrder.isPaypalThroughBraintree) {
                    this._super();
                }
            }
        })
    }
});