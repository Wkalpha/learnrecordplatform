<template>
  <Layout :pagetitle="'可發行票券總覽'">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">可發行票券查詢</h4>
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
                        <label class="form-label" for="voucherName">票券名稱</label>
                        <input class="form-control" type="text" v-model="searchCondition.voucherName" id="voucherName"
                          placeholder="輸入 文字">
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="hstack gap-3">
                      <button type="submit" @click.prevent="doSearch" class="btn btn-primary w-md">
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
            <h4 class="card-title mb-0">票券總覽</h4>
          </div>
          <div class="card-body">

            <div class="col-lg-12">
              <div class="mt-4 mt-xl-0">

                <div class="row">

                  <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i>票券清單</h5>

                </div>
                <div class="row">
                  <Grid :style="{ height: '500px' }" :data-items="result" :sortable="true" :pageable="true"
                    :filterable="false" :filter="filter" :sort="sort" :skip="skip" :take="take" :total="total"
                    :columns="columns" @pagechange="pageChangeHandler">
                    <template v-slot:voucherDetail="{ props }">
                      <detailCell 
                        :data-item="props.dataItem" 
                        :param="props.dataItem.voucherId" 
                        showText="詳細"
                        detail-link="/issue-voucher/voucher-detail"></detailCell>
                    </template>
                    <template v-slot:issue="{ props }">
                      <detailCell 
                        :data-item="props.dataItem" 
                        :param="props.dataItem.voucherId" 
                        showText="發行"
                        detail-link="/issue-voucher/issue-voucher"></detailCell>
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
import { Grid } from '@progress/kendo-vue-grid'
import { toDataSourceRequestString } from '@progress/kendo-data-query';
import detailCell from '../../../components/kendo/cell-button/detailCell.vue';

export default {
  mounted: function () {
    this.fetchData({ skip: this.skip, take: this.take });
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
        storeName: "",
        address:""
      },
      result: [],
      skip: 0,
      take: 10,
      total: 0,
      columns: [
        { field: 'voucherId', title: '票券編號'},
        { field: 'voucherName', title: '票券名稱' },
        { field: 'voucherType', title: '票券類別' },
        { field: 'createTime', title: '建立時間' },
        { field: 'creator', title: '建立人員' },
        { title: '', cell: 'voucherDetail', filterable: false, width: '100px' },
        { title: '', cell: 'issue', filterable: false, width: '100px' },
      ]
    };
  },
  components: {
    Layout, Grid, detailCell
  },
  watch: {
    "searchCondition.voucherName": function (newValue) {
      this.setFilter("voucherName", newValue, "contains");
    },
  },
  computed: {

  },
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
        this.fetchData({ skip: this.skip, take: this.take });
      }, 300);
    },
    fetchData: function (dataState) {
      const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
      const base_url = '/api/QueryIsLaunchedVoucher';
      const init = { method: 'GET', accept: 'application/json', headers: {} };
      fetch(`${base_url}?${queryStr}`, init)
        .then(response => response.json())
        .then(({ data, total }) => {
          this.result = data.map(item => { return { ...item, selected: false } });
          this.total = total;
        });
    },
    doSearch: function () {
      this.resetPager();
      this.fetchData({ skip: this.skip, take: this.take, filter: this.filter });
    },
    resetPager: function () {
      this.skip = 0;
      this.take = 10;
    },
  },
}
</script>
