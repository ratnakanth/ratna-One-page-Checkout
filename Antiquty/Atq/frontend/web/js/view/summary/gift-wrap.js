
define(
    [
        'ko',
        'Magento_Checkout/js/view/summary/abstract-total',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/totals',
        'Antiquty_Atq/js/model/osc-data'
    ],
    function (ko, Component, quote, totals, oscData) {
        "use strict";

        return Component.extend({
            defaults: {
                template: 'Antiquty_Atq/container/summary/gift-wrap'
            },
            totals: quote.getTotals(),
            isDisplay: function () {
                return this.getPureValue() >= 0 && oscData.getData('is_use_gift_wrap');
            },
            getPureValue: function () {
                var giftWrapAmount = 0;

                if (this.totals() && totals.getSegment('osc_gift_wrap')) {
                    giftWrapAmount = parseFloat(totals.getSegment('osc_gift_wrap').value);
                }

                return giftWrapAmount;
            },
            getValue: function () {
                return this.getFormattedPrice(this.getPureValue());
            }
        });
    }
);
