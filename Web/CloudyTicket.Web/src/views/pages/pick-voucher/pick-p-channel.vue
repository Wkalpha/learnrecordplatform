<template>
  <Layout :pagetitle="''">
    <Form @submit="save">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">發行票券</h4>
                    </div>
                        <div class="card-body">
                            <div class="ro">
                                <div class="col-3">
                                    <div class="mb-3">票券名稱</div>
                                </div>
                                <div class="mb-3">
                                    {{form.voucherName}}
                                </div>
                            </div>
                            <div class="row">
                                <div class="mb-3">
                                    條文
                                </div>
                                <div class="mb-3">
                                    <li v-for="(Terms, index) in form.voucherTermData" :key="index">{{Terms.content}}</li>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 mb-3">
                                    <button type="submit" @click.prevent="send" class="btn btn-primary w-md">確認列印</button>
                                </div>
                                <div class="col-2 mb-3">
                                    <button type="submit" @click.prevent="prev" class="btn btn-primary w-md">返回</button>
                                </div>
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { required } from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";
import axios from 'axios';

export default {
    components: {
        Layout
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const issuedVoucherId = route.params.issuedVoucherId;
        const voucherId = route.params.voucherId;
        const rules = {
            slotNumber : {required}
        };

        const form = ref({
            issuedVoucherId : issuedVoucherId,
            voucherId: String,
            issueType: Int8Array, // 發行方式 1:手機 2:Email 3:直接列印
            voucherName : '',
            voucherType: Int8Array, // 票券類型 1:電子 2:紙本
            voucherTermData: [],
            phoneNumber: '',
            IsPicked: Boolean,
            email: ''
        });

        const v$ = useVuelidate(rules, form);

        onMounted(async () => {
            const base_url = '/api/QueryIssuedVoucher';
            const type_init = { method: 'GET', accept: 'application/json', headers: {} };
            let resultList = await fetch(`${base_url}?IssuedVoucherId=${issuedVoucherId}&VoucherId=${voucherId}`, type_init)
                .then(response => response.json());
            form.value.voucherId = resultList.voucherId;
            form.value.voucherName = resultList.voucherName;
            form.value.issuerName = resultList.issuerName;
            form.value.voucherType = resultList.voucherType;
            form.value.expiredDate = resultList.expiredDate;
            form.value.issueType = resultList.issueType;
            form.value.voucherTermData = resultList.voucherTermData;
            form.value.email = resultList.email;
            form.value.phoneNumber = resultList.phoneNumber;
        },
        );
        return { v$, form, router };
    },
    methods: {
        test(){
        },
        prev() {
            this.$router.push({ name: "list-pickpvoucher" });
        },
        send: function () {
            this.doPost();
        },
        doPost() {
            let form = {
                "IssuedVoucherId": this.form.issuedVoucherId,
                "Updator": "Jimmy", // TODO - 根據領取的人
                "IsPicked": true,
                "IssueType": this.form.issueType
            };

            let self = this;
            axios({
                method: 'post',
                url: "/api/PickPVoucher",
                headers: {
                    "content-type": "application/json"
                },
                data: form
            }).then(response => {
                console.log(response);
                self.router.push({ name: 'list-pickpvoucher' });
            })
                .catch(error => {
                    console.log(this.form);
                    console.log(error);
                });
        },
    }
}
</script>
