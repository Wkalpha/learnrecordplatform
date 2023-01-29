<template>
    <Layout :pagetitle="'票券總覽'">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">票券查詢</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="mt-4 mt-xl-0">
                                    <h5 class="font-size-14 mb-4">
                                        <i class="mdi mdi-arrow-right text-primary me-1"></i>查詢條件
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="form-label" for="voucher-id">票券編號</label>
                                                <input class="form-control" type="text"
                                                       v-model="searchCondition.voucherId" id="voucher-id"
                                                       placeholder="輸入 文字">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="form-label" for="main-category">大類別</label>
                                                <select id="main-category" class="form-select">
                                                    <option selected>請選擇</option>
                                                    <option>餐飲業</option>
                                                    <option>旅館業</option>
                                                    <option>美容業</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="form-label" for="sub-category">小類別</label>
                                                <select id="sub-category" class="form-select">
                                                    <option selected>請選擇</option>
                                                    <option>飲料</option>
                                                    <option>住宿</option>
                                                    <option>按摩</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="form-label" for="voucher-name">票券名稱</label>
                                                <input class="form-control" type="text"
                                                       v-model="searchCondition.voucherName" id="voucher-name"
                                                       placeholder="輸入 文字">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="form-label" for="sub-category">狀態</label>
                                                <select id="sub-category" class="form-select">
                                                    <option selected>全部</option>
                                                    <option>上架</option>
                                                    <option>下架</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <div class="hstack gap-3">
                                            <button type="submit" @click.prevent="doSearch"
                                                    class="btn btn-primary w-md">
                                                搜尋
                                            </button>
                                            <div class="vr"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">票券總覽</h4>
                    </div>
                    <div class="card-body">
                        <div class="col-lg-12">
                            <div class="mt-4 mt-xl-0">

                                <div class="row">

                                    <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i>票券清單
                                    </h5>

                                </div>
                                <div class="row">
                                    <Grid :style="{ height: '500px' }" :data-items="result" :sortable="true"
                                          :pageable="true"
                                          :filterable="false" :filter="filter" :sort="sort" :skip="skip" :take="take"
                                          :total="total"
                                          :columns="columns" @pagechange="pageChangeHandler">
                                        <template v-slot:voucherDetail="{ props }">
                                            <detailCell :data-item="props.dataItem" showText="詳細"
                                                        :param="props.dataItem.voucherId"
                                                        detail-link="/voucher/detail-voucher"></detailCell>
                                        </template>
                                        <template v-slot:updateVoucher="{ props }">
                                            <detailCell :data-item="props.dataItem" :param="props.dataItem.voucherId"
                                                        detail-link="/voucher/update-voucher"
                                                        showText="修改"></detailCell>
                                        </template>
                                        <template v-slot:updateLaunched="{ props }">
                                            <launch-cell :data-item="props.dataItem"
                                                         :showText="props.dataItem.isLaunched === true ? '下架' : '上架'"
                                                         :is-action="props.dataItem.isLaunched"
                                                         @do-action="updateLaunched(props.dataItem.voucherId, !props.dataItem.isLaunched)"></launch-cell>
                                        </template>
                                    </Grid>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "../../layouts/main"
import {Grid} from '@progress/kendo-vue-grid'
import {toDataSourceRequestString} from '@progress/kendo-data-query';
import detailCell from '../../../components/kendo/cell-button/detailCell.vue';
import launchCell from '../../../components/kendo/cell-button/launchCell.vue';
import axios from "axios";

export default {
    mounted: function () {
        this.fetchData({skip: this.skip, take: this.take});
    },
    data() {
        return {
            loader: false,
            sort: null,
            filter: {
                logic: "and",
                filters: []
            },
            searchCondition: {
                voucherId: '',
                voucherName: '',
                mainCategory: '',
                subCategory: '',
                issuerName: '',
                isLaunched: ''
            },
            result: [],
            skip: 0,
            take: 10,
            total: 0,
            columns: [
                {field: 'voucherId', title: '票券編號', hidden: false},
                {field: 'mainCategory', title: '大類別'},
                {field: 'mainCategoryId', title: '大類別Id', hidden: true},
                {field: 'subCategory', title: '小類別'},
                {field: 'voucherName', title: '票券名稱'},
                {field: 'voucherType', title: '票券種類'},
                {field: 'issuerName', title: '發行商'},
                {field: 'net', title: 'NET'},
                {field: 'sellPrice', title: '售價'},
                {field: 'expiredDate', title: '商品到期日'},
                {field: 'isLaunched', title: '狀態b', hidden: true},
                {field: 'isLaunchedString', title: '狀態'},
                {field: 'createTime', title: '建立時間'},
                {field: 'creator', title: '建立者'},
                {title: '', cell: 'voucherDetail', filterable: false, width: '100px'},
                {title: '', cell: 'updateVoucher', filterable: false, width: '100px'},
                {title: '', cell: 'updateLaunched', filterable: false, width: '100px'}
            ]
        };
    },
    components: {
        Layout, Grid, detailCell, launchCell
    },
    watch: {
        "searchCondition.voucherId": function (newValue) {
            this.setFilter("voucherId", newValue, "contains");
        },
        "searchCondition.voucherName": function (newValue) {
            this.setFilter("voucherName", newValue, "contains");
        },
        "searchCondition.mainCategory": function (newValue) {
            this.setFilter("mainCategory", newValue, "contains");
        },
        "searchCondition.subCategory": function (newValue) {
            this.setFilter("subCategory", newValue, "contains");
        },
        "searchCondition.issuerName": function (newValue) {
            this.setFilter("issuerName", newValue, "contains");
        },
        "searchCondition.isLaunched": function (newValue) {
            this.setFilter("isLaunched", newValue, "contains");
        }
    },
    computed: {},
    methods: {
        setFilter: function (fieldName, newValue, operator) {
            if (newValue !== "") {
                let index = this.filter.filters.findIndex(
                    (x) => x.field === fieldName
                );
                if (index === -1) {
                    this.filter.filters.push({
                        field: fieldName,
                        operator: operator,
                        value: newValue,
                    });
                } else {
                    this.filter.filters[index].value = newValue;
                }
            } else {
                let index = this.filter.filters.findIndex(
                    (x) => x.field === fieldName
                );
                this.filter.filters.splice(index, 1);
            }
        },
        pageChangeHandler: function (event) {
            this.loader = true;
            setTimeout(() => {
                this.loader = false;
                this.skip = event.page.skip;
                this.take = event.page.take;
                this.fetchData({skip: this.skip, take: this.take});
            }, 300);
        },
        fetchData: function (dataState) {
            const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
            const base_url = '/api/QueryVoucherForm';
            const init = {method: 'GET', accept: 'application/json', headers: {}};
            fetch(`${base_url}?${queryStr}`, init)
                .then(response => response.json())
                .then(({data, total}) => {
                    this.result = data.map(item => {
                        return {...item, selected: false}
                    });
                    this.total = total;
                });
        },
        doSearch: function () {
            this.resetPager();
            this.fetchData({skip: this.skip, take: this.take, filter: this.filter});
        },
        resetPager: function () {
            this.skip = 0;
            this.take = 10;
        },
        updateLaunched: function (voucherId, isLaunched) {
            let url = '/api/UpdateVoucherLunched';
            let data = {
                voucherId: voucherId,
                isLaunched: isLaunched
            };
            axios.post(url, data).then(() => {
                this.doSearch();
            });
        }
    },
}
</script>
