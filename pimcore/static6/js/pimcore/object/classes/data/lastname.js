/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) 2009-2016 pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

pimcore.registerNS("pimcore.object.classes.data.lastname");
pimcore.object.classes.data.lastname = Class.create(pimcore.object.classes.data.data, {

    type: "input",
    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: false,
        classificationstore : false
    },

    initialize: function (treeNode, initData) {
        this.type = "lastname";

        if(!initData["name"]) {
            initData = {
                title: t("lastname")
            };
        }

        initData.fieldtype = "lastname";
        initData.datatype = "data";
        initData.name = "lastname";
        treeNode.set("text", "lastname");

        this.initData(initData);

        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("lastname");
    },

    getGroup: function () {
            return "crm";
    },

    getIconClass: function () {
        return "pimcore_icon_lastname";
    },

    getLayout: function ($super) {

        $super();

        var nameField = this.layout.getComponent("standardSettings").getComponent("name");
        nameField.disable();

        this.specificPanel.removeAll();
        this.specificPanel.add([
            {
                xtype: "numberfield",
                fieldLabel: t("width"),
                name: "width",
                value: this.datax.width
            },{
                xtype: "numberfield",
                fieldLabel: t("columnlength"),
                name: "columnLength",
                value: this.datax.columnLength
            }
        ]);

        return this.layout;
    },

    applySpecialData: function(source) {
    if (source.datax) {
        if (!this.datax) {
            this.datax =  {};
        }
        Ext.apply(this.datax,
            {
                width: source.datax.width,
                columnLength: source.datax.columnLength
            });
    }
}

});
