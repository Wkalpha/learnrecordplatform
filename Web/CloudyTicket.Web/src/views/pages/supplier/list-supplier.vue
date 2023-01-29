<template>
    <Layout :pagetitle="'供應商總覽'">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">供應商查詢</h4>
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
                                                <label class="form-label" for="bankId">供應商名稱</label>
                                                <input class="form-control" type="text"
                                                       v-model="searchCondition.supplierName" id="supplierName"
                                                       placeholder="輸入 文字">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="form-label" for="bankId">地址</label>
                                                <input class="form-control" type="text"
                                                       v-model="searchCondition.address" id="address"
                                                       placeholder="輸入 文字">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <div class="hstack gap-3">
                                            <button type="submit" @click.prevent="doSearch"
                                                    class="btn btn-primary w-md">
                                                搜尋
                                            </button>
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
                        <h4 class="card-title mb-0">供應商總覽</h4>
                    </div>
                    <div class="card-body">

                        <div class="col-lg-12">
                            <div class="mt-4 mt-xl-0">

                                <div class="row">

                                    <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i>供應商清單
                                    </h5>

                                </div>
                                <div class="row">
                                    <Grid :style="{ height: '500px' }" :data-items="result" :sortable="true"
                                          :pageable="true"
                                          :filterable="false" :filter="filter" :sort="sort" :skip="skip" :take="take"
                                          :total="total"
                                          :columns="columns" @pagechange="pageChangeHandler">
                                        <template v-slot:storeDetail="{ props }">
                                            <detailCell :data-item="props.dataItem" :param="props.dataItem.supplierId"
                                                        showText="詳細"
                                                        detail-link="/supplier/detail-supplier"></detailCell>
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
                supplierName: "",
                address: ""
            },
            result: [],
            skip: 0,
            take: 10,
            total: 0,
            columns: [
                {field: 'supplierId', title: '供應商編號', hidden: true},
                {field: 'supplierName', title: '供應商名稱'},
                {field: 'businessName', title: '營業名稱'},
                {field: 'mainCategory', title: '大類別'},
                {field: 'subCategory', title: '小類別'},
                {field: 'uniformNo', title: '公司統編'},
                {field: 'address', title: '地址'},
                {field: 'contact', title: '聯絡人'},
                {field: 'contactPhone', title: '聯絡人電話'},
                {field: 'contactMobile', title: '聯絡人手機'},
                {field: 'contactEmail', title: '聯絡人信箱'},
                {field: 'createTime', title: '建立時間'},
                {field: 'creator', title: '建立者'},
                // { field: 'chairman', title: '分店數量' },
                {title: '', cell: 'storeDetail', filterable: false, width: '150px'},
            ]
        };
    },
    components: {
        Layout, Grid, detailCell
    },
    watch: {
        "searchCondition.supplierName": function (newValue) {
            this.setFilter("supplierName", newValue, "contains");
        },
        "searchCondition.address": function (newValue) {
            this.setFilter("address", newValue, "contains");
        },

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
            const base_url = '/api/QuerySupplier';
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
    },
}
</script>
