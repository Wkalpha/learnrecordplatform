<template>
  <Layout :pagetitle="'可請款列表'">
    <Form @submit="save">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0">可請款查詢</h4>
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
                            <input class="form-control" type="text" v-model="sendingGrid.searchCondition.voucherName" id="voucherName"
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
                <h4 class="card-title mb-0">可請款總覽</h4>
              </div>
              <div class="card-body">

                <div class="col-lg-12">
                  <div class="mt-4 mt-xl-0">

                    <div class="row">

                      <h5 class="font-size-14 mb-4"><i class="mdi mdi-arrow-right text-primary me-1"></i>可請款清單</h5>

                    </div>
                    <div class="row">
                      <Grid 
                        :style="{ height: '500px' }" 
                        :data-items="sendingGrid.result" 
                        :sortable="true" 
                        :pageable="true"
                        :filterable="false" 
                        :filter="sendingGrid.filter" 
                        :sort="sendingGrid.sort" 
                        :skip="sendingGrid.skip" 
                        :take="sendingGrid.take" 
                        :total="sendingGrid.total"
                        :columns="columns"
                        :selected-field="sendingGrid.selectedField"
                        @pagechange="pageChangeHandler"
                        @selectionchange="onSelectionChange"
                        @headerselectionchange="onHeaderSelectionChange"
                        @rowclick="onRowClick">
                        <template v-slot:detail="{ props }">
                          <detailCell
                            :data-item="props.dataItem" 
                            :param="props.dataItem.issuedVoucherId"
                            showText="詳細資料"
                            detail-link="/auth-chain/payment-detail">
                          </detailCell>
                        </template>
                      </Grid>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="col-md-3">
                    <button
                      type="submit"
                      @click.prevent="request"
                      class="btn btn-primary">
                      請款
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </Form>
    
  </Layout>
</template>

<script>


import Layout from "../../layouts/main"
import { useRouter } from 'vue-router';
import { ref, onMounted } from "vue";
import { Grid } from '@progress/kendo-vue-grid'
import { toDataSourceRequestString } from '@progress/kendo-data-query';
import detailCell from '../../../components/kendo/cell-button/detailCell.vue';
import axios from "axios";

const fetchGridData = async (dataState) => {
    const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
    const base_url = "/api/QueryCanRequestPayment";
    const init = { method: "GET", accept: "application/json", headers: {} };
    let fetchResult = await fetch(`${base_url}?${queryStr}`, init)
        .then((response) => response.json())
        .then(({ data, total }) => {
            let result = data.map((item) => {
                return { ...item, selected: false };
            });
            return { result: result, total: total };
        });

    return fetchResult;
};


export default {
  setup(){
        const router = useRouter();

        const sendingGrid = ref({
            selectedField: "selected",
            sort: null,
            filter: {
              logic: "and",
              filters: []
            },
            searchCondition: {
              voucherName: ""
            },
            result: [],
            skip: 0,
            take: 10,
            total: 0,
            staticColumns: [
            { field: 'issuedVoucherId', title: '票券編號' },
            { field: 'voucherName', title: '票券名稱'},
            { field: 'price', title: '金額' },
            { title: '', cell: 'detail', filterable: false, width: '100px' },
            ],
            formSelected:[]
        });

        onMounted(async () => {


            let dataState = { skip: sendingGrid.value.skip, take: sendingGrid.value.take, filter: sendingGrid.value.filter };
            let fetchResult = await fetchGridData(dataState);

            sendingGrid.value.result = fetchResult.result;
            sendingGrid.value.total = fetchResult.total;

        });

        const isCloseBtn = ref(false);
        return {
            sendingGrid,
            isCloseBtn,
            router
        };
  },
  components: {
    Layout, Grid, detailCell, 
  },
  computed:{
    areAllSelected() {
            return this.sendingGrid.result.findIndex((item) => item.selected === false) === -1;
    },
    columns() {
        return [
            {
                field: "selected",
                width: "50px",
                headerSelectionValue: this.areAllSelected,
            },
            ...this.sendingGrid.staticColumns,
        ];
    },
  },
  watch: {
    "sendingGrid.searchCondition.voucherName": function (newValue) {
      this.setFilter("voucherName", newValue, "contains");
    },
  },
  methods: {
    request: function () {
      let form = {
                issuedVoucherIds: this.sendingGrid.formSelected,
            };
            axios({
                method: "post",
                url: "/api/RequestPayment",
                headers: {
                    "content-type": "application/json",
                },
                data: form,
            })
                .then(() => {
                    this.fetchData({ skip: this.sendingGrid.skip, take: this.sendingGrid.take, filter: this.sendingGrid.filter });
                })
                .catch(() => {
                    this.fetchData({ skip: this.sendingGrid.skip, take: this.sendingGrid.take, filter: this.sendingGrid.filter });
                });
        this.sendingGrid.formSelected = [];
    },
    onHeaderSelectionChange (event) {
        let checked = event.event.target.checked;
        this.sendingGrid.result = this.sendingGrid.result.map((item) => { return {...item, selected: checked} });
        this.sendingGrid.result.forEach((element) => {
            this.changeApplyFormSelected(element.issuedVoucherId, element.selected);
        });

    },
    onSelectionChange (event) {
      event.dataItem[this.sendingGrid.selectedField] = !event.dataItem[this.sendingGrid.selectedField];
      let key = event.dataItem["issuedVoucherId"];
      this.changeApplyFormSelected(key, event.dataItem[this.sendingGrid.selectedField]);
    },
    onRowClick (event) {
      event.dataItem[this.sendingGrid.selectedField] = !event.dataItem[this.sendingGrid.selectedField];
      let key = event.dataItem["issuedVoucherId"];
      this.changeApplyFormSelected(key, event.dataItem[this.sendingGrid.selectedField]);
    },
    changeApplyFormSelected(key, isSelected) {
            if (isSelected) {
              if (!this.sendingGrid.formSelected.includes(key)) {
                  this.sendingGrid.formSelected.push(key);
              }
            } else {
                if (this.sendingGrid.formSelected.includes(key)) {
                    this.sendingGrid.formSelected = this.sendingGrid.formSelected.filter((x) => x != key);
                }
            }
        },
    setFilter: function (fieldName, newValue, operator) {
      if (newValue !== "") {
        let index = this.sendingGrid.filter.filters.findIndex(
          (x) => x.field === fieldName
        );
        if (index === -1) {
          this.sendingGrid.filter.filters.push({
            field: fieldName,
            operator: operator,
            value: newValue,
          });
        } else {
          this.sendingGrid.filter.filters[index].value = newValue;
        }
      } else {
        let index = this.sendingGrid.filter.filters.findIndex(
          (x) => x.field === fieldName
        );
        this.sendingGrid.filter.filters.splice(index, 1);
      }
    },
    pageChangeHandler: function (event) {
      setTimeout(() => {
        this.sendingGrid.skip = event.page.skip;
        this.sendingGrid.take = event.page.take;
        this.fetchData({ skip: this.sendingGrid.skip, take: this.sendingGrid.take });
      }, 300);
    },
    fetchData: async function (dataState) {
        let data = await fetchGridData(dataState);
        this.sendingGrid.result = data.result;
        this.sendingGrid.total = data.total;
    },
    resetPager: function () {
      this.sendingGrid.skip = 0;
      this.sendingGrid.take = 10;
    },
    doSearch: function () {
      this.resetPager();
      this.fetchData({ skip: this.sendingGrid.skip, take: this.sendingGrid.take, filter: this.sendingGrid.filter });
    },
  },
}
</script>
