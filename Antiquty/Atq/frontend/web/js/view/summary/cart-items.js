

define([
    'ko',
    'underscore',
    'jquery',
    'Magento_Checkout/js/view/summary/cart-items',
    'Antiquty_Atq/js/model/osc-data'
], function (ko, _, $, Component, oscData) {
    "use strict";

    var cacheKey = 'is_cart_expanded';

    return Component.extend({
        toggleCart: function () {
            oscData.setData(cacheKey, !this.isCartExpanded());
        },

        isCartExpanded: function () {
            var isExpanded           = oscData.getData(cacheKey),
                isShowItemListToggle = window.checkoutConfig.oscConfig.isShowItemListToggle;

            return typeof isExpanded === 'undefined' || !isShowItemListToggle ? true : isExpanded;
        }
    });
});
