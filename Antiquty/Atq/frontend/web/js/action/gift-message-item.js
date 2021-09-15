

define(
    [
        'jquery',
        'Magento_Checkout/js/model/quote',
        'Antiquty_Atq/js/model/resource-url-manager',
        'Antiquty_Atq/js/model/gift-message',
        'mage/storage'
    ],
    function ($,
              quote,
              resourceUrlManager,
              giftMessageModel,
              storage) {
        'use strict';

        var giftMessageItems = window.checkoutConfig.oscConfig.giftMessageOptions.giftMessage.itemLevel,
            giftMessageModel = new giftMessageModel();

        return function (data, itemId, remove) {
            return storage.post(
                resourceUrlManager.getUrlForGiftMessageItemInformation(quote, itemId),
                JSON.stringify(data)
            ).done(
                function (response) {
                    if (response == true) {
                        if (remove) {
                            delete giftMessageItems[itemId].message;
                            giftMessageModel.showMessage('success', 'Delete gift message item success.');
                            return this;
                        }
                        giftMessageItems[itemId]['message'] = data.gift_message;
                        giftMessageModel.showMessage('success', 'Update gift message item success.');
                    }
                }
            ).fail(
                function () {
                    if (remove) {
                        giftMessageModel.showMessage('error', 'Can not delete gift message item. Please try again!');
                    }
                    giftMessageModel.showMessage('error', 'Can not update gift message item. Please try again!');
                }
            )
        };
    }
);
