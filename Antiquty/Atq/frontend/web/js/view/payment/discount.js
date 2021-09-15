
define(
    [
        'ko',
        'Magento_SalesRule/js/view/payment/discount',
        'Antiquty_Atq/js/model/osc-loader/discount'
    ],
    function (ko, Component, discountLoader) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Antiquty_Atq/container/review/discount'
            },
            isBlockLoading: discountLoader.isLoading,

            initialize: function () {
                this._super();
                this.isApplied(window.checkoutConfig.quoteData.coupon_code);
            }
        });
    }
);
