const applyApi = require('../../utils/applyApi.js');
const verify = require('../../utils/verify.js');

let that,app=getApp();

Page({
    data: {
        navList: [{
            img: "../../images/home_button_orderinquiry@2x.png",
            des: "待接单",
            status: 2
        }, {
            img: "../../images/home_button_commodity@2x.png",
            des: "待确认",
            status: 3
        }, {
            img: "../../images/home_button_service@2x.png",
            des: "待评分",
            status: 4
        }],
    },
    onShow() {
        for (var i = 0, list = that.data.navList; i < list.length; i++) {
            that.getOrderList(list[i].status);
        };
        that.getLatestOrder();
    },
    onLoad: function() {
        that = this;
        var userInfo=wx.getStorageSync('honey-user');
        that.setData({
            userInfo:userInfo.profile
        })
    },
    getOrderList(status) {
        applyApi.postByToken('order/status-order', {
            status: status
        }, function(res) {
            that.data.navList[status - 2].total = res.data.total;
            that.setData({
                navList: that.data.navList
            })
        })
    },
    navToOrder(e) {
        wx.setStorageSync('honey-order-status',e.currentTarget.dataset.status);
        wx.switchTab({
            url: `../order/order`
        })
    },
    coupon(e) {
        wx.navigateTo({
            url: `../coupon/coupon?from=profile`
        })
    },
    getLatestOrder() {
        applyApi.postByToken('notice/getNotReadNum', null, function(res) {
            console.log('getNotReadNum', res);
            that.setData({
                latestOrder:res.data.lastestOrder
            })
        });
    },
    goLatest(e){
        wx.navigateTo({
            url:`../order-detail/detail?orderId=${that.data.latestOrder.id}`
        })
    },
    login(e){
        app.openSetting(function(res){
            that.onLoad();
            that.onShow();
            wx.setStorageSync('honey-order-status','0')
        })
    }
})
