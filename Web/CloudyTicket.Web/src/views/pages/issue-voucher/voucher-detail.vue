<template>
  <Layout :pagetitle="'票券資訊'">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">票券資訊</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-3">
                <div class="mb-3">
                  <label class="form-label" for="voucherName">票券名稱</label>
                  <div>
                    <label class="form-label">{{form.voucherName}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div class="mb-3">
                  <label class="form-label" for="issuerName">發行商名稱</label>
                  <div>
                    <label class="form-label">{{form.issuerName}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div class="mb-3">
                  <label class="form-label" for="voucherTermData">票券條文</label>
                  <div>
                    <li v-for="(Terms, index) in form.voucherTermData" :key="index">{{Terms.content}}</li>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div class="mb-3">
                  <label class="form-label" for="issuedLimit">剩餘可發行數量</label>
                  <div>
                    <label class="form-label">{{(form.issuedLimit &lt;= -999 ? '無限':form.issuedLimit+' 張')}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div class="mb-3">
                  <label class="form-label" for="expiredDate">票券下架日期</label>
                  <div>
                    <label class="form-label">{{form.expiredDate}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div>
                  <button type="submit" @click.prevent="prev" class="btn btn-primary ">返回</button>
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { required } from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
        const route = useRoute();
        const router = useRouter();
        const voucherId = route.params.voucherId;
        const rules = {
            slotNumber : {required}
        };

        const form = ref({
            voucherId : voucherId,
            voucherName : '',
            voucherTermData: [],
            issuerName: String,
            issuedLimit: 0,
            expiredDate: Date
        });

        const v$ = useVuelidate(rules, form);

        onMounted(async () => {
            const base_url = '/api/QueryVoucher';
            const type_init = { method: 'GET', accept: 'application/json', headers: {} };
            form.value = await fetch(`${base_url}?VoucherId=${voucherId}`, type_init)
                .then(response => response.json()).then(data => data.value);
        });
        return { v$, form, router };
    },
  components: {
    Layout
  },
  methods: {
    prev() {
      this.$router.push({ name: "list-issuevoucher" });
      },
  },
}
</script>
