
define([
        'jquery',
        'underscore',
        'uiComponent',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/checkout-data'
    ], function ($,
                 _,
                 Component,
                 quote,
                 customer,
                 checkoutData) {
        'use strict';

        var isEnableGeoIp = window.checkoutConfig.oscConfig.geoIpOptions.isEnableGeoIp,
            geoIpData = window.checkoutConfig.oscConfig.geoIpOptions.geoIpData;

        return Component.extend({
            initialize: function () {
                this.initGeoIp();
                this._super();
                return this;
            },
            initGeoIp: function () {
                if (isEnableGeoIp) {
                    if (!quote.isVirtual()) { /** Set Geo Ip data to shippingAddress */
                        if ((!customer.isLoggedIn() && checkoutData.getShippingAddressFromData() == null)
                            || (customer.isLoggedIn() && checkoutData.getNewCustomerShippingAddress() == null)) {
                            checkoutData.setShippingAddressFromData(geoIpData);
                        }
                    } else { /** Set Geo Ip data to billingAddress */
                        if ((!customer.isLoggedIn() && checkoutData.getBillingAddressFromData() == null)
                            || (customer.isLoggedIn() && checkoutData.getNewCustomerBillingAddress() == null)) {
                            checkoutData.setBillingAddressFromData(geoIpData);
                        }
                    }
                }
            }
        });
    }
);
