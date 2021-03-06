

define([
    'jquery',
    'Magento_Checkout/js/model/quote',
    'Antiquty_Atq/js/model/resource-url-manager',
    'mage/storage',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/payment/method-converter',
    'Magento_Checkout/js/model/payment-service',
    'Magento_Checkout/js/model/shipping-service',
    'Antiquty_Atq/js/model/osc-loader',
    'Magento_Customer/js/customer-data',
    'uiRegistry'
], function ($,
             quote,
             resourceUrlManager,
             storage,
             errorProcessor,
             customer,
             methodConverter,
             paymentService,
             shippingService,
             oscLoader,
             customerData,
             registry) {
    'use strict';

    var itemUpdateLoader = ['shipping', 'payment', 'total'];

    return function (payload) {
        var isRemove = !('item_qty' in payload);

        if (!customer.isLoggedIn()) {
            payload.cart_id = quote.getQuoteId();
        }

        oscLoader.startLoader(itemUpdateLoader);

        return storage.post(
            resourceUrlManager.getUrlForUpdateItemInformation(quote, isRemove),
            JSON.stringify(payload)
        ).done(
            function (response) {
                var options, paths,
                    thumbnailComponent = registry.get('checkout.sidebar.summary.cart_items.details.thumbnail');

                if (response.redirect_url) {
                    window.location.href = response.redirect_url;
                    return;
                }

                // remove downloadable options on cart item reload
                $('#downloadable-links-list').remove();
                $('#links-advice-container').remove();

                if (response.image_data && thumbnailComponent) {
                    thumbnailComponent.imageData = JSON.parse(response.image_data);
                }

                if (response.options) {
                    options = JSON.parse(response.options);

                    response.totals.items.forEach(function (item) {
                        item.mposc = options[item.item_id];
                    });
                }

                if (response.request_path) {
                    paths = JSON.parse(response.request_path);

                    response.totals.items.forEach(function (item) {
                        item.request_path = paths[item.item_id];
                    });
                }

                quote.setTotals(response.totals);
                paymentService.setPaymentMethods(methodConverter(response.payment_methods));
                if (response.shipping_methods && !quote.isVirtual()) {
                    shippingService.setShippingRates(response.shipping_methods);
                }
                customerData.reload(['cart'], true);
            }
        ).fail(
            function (response) {
                errorProcessor.process(response);
            }
        ).always(
            function () {
                oscLoader.stopLoader(itemUpdateLoader);
            }
        );
    };
});
