
define(
    [
        'ko',
        'jquery',
        'Magento_Checkout/js/view/payment',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Antiquty_Atq/js/model/checkout-data-resolver',
        'Antiquty_Atq/js/model/payment-service',
        'Antiquty_Atq/js/model/paypal_express_compatible',
        'Magento_Customer/js/customer-data',
        'mage/translate'
    ],
    function (ko,
              $,
              Component,
              quote,
              stepNavigator,
              additionalValidators,
              oscDataResolver,
              oscPaymentService,
              paypalExpressCompatible,
              customerData) {
        'use strict';

        oscDataResolver.resolveDefaultPaymentMethod();
        var isReload = true;

        return Component.extend({
            defaults: {
                template: 'Antiquty_Atq/container/payment'
            },
            isLoading: oscPaymentService.isLoading,
            errorValidationMessage: ko.observable(false),

            initialize: function () {
                var self = this;

                this._super();

                stepNavigator.steps.removeAll();

                additionalValidators.registerValidator(this);

                quote.paymentMethod.subscribe(function (value) {
                    paypalExpressCompatible.togglePlaceOrderButton(quote.paymentMethod());
                    self.errorValidationMessage(false);
                });

                if ($('.page.messages')) {
                    setTimeout(function () {
                        $('.page.messages').remove()
                    }, 8000);
                }

                if (isReload) {
                    customerData.reload(['cart'], false);
                    isReload = false;
                }
                this.customer = customerData.get('cart');

                return this;
            },

            validate: function () {
                if (!quote.paymentMethod()) {
                    this.errorValidationMessage($.mage.__('Please specify a payment method.'));

                    return false;
                }

                return true;
            }
        });
    }
);
