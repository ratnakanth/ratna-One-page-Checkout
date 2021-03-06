
define([
    'jquery',
    'Magento_ConfigurableProduct/js/configurable',
    'jquery/ui'
], function ($) {
    'use strict';

    $.widget('mage.mposcConfigurable', $.mage.configurable, {
        _initializeOptions: function () {
            var element = $(this.options.priceHolderSelector);

            if (!element.data('magePriceBox')) {
                element.priceBox();
            }

            return this._super();
        },

        _calculatePrice: function (config) {
            var element = $(this.options.priceHolderSelector);

            if (!element.data('magePriceBox')) {
                element.priceBox();
            }

            return this._super(config);
        },
    });

    return $.mage.mposcConfigurable;
});
