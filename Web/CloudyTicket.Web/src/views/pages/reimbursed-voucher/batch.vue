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
                            <div class="row" v-if="form.issueType == 1">
                                <div class="mb-3">
                                    請輸入手機號碼
                                    <div>
                                        <input type="text" v-model="form.phoneNumber">
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-else-if="form.issueType == 2">
                                <div class="mb-3">
                                    請輸入電子信箱
                                    <div>
                                        <input type="text" v-model="form.email">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 mb-3">
                                    <button type="submit" @click.prevent="send" class="btn btn-primary w-md">確認取票</button>
                                </div>
                                <div class="col-2 mb-3">
                                    <button type="submit" @click.prevent="prev" class="btn btn-primary w-md">返回</button>
                                </div>
                            </div>
                            <!-- <div class="row">
                                <div class="mb-3">
                                    <button @click.prevent="test" class="btn btn-primary w-md">測試按鈕</button>
                                </div>
                            </div> -->
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
            issueType: Int8Array,
            voucherName : '',
            voucherTermData: [],
            phoneNumber: '',
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
            this.$router.push({ name: "list-pickevoucher" });
        },
        send: function () {
            this.doPost();
        },
        doPost() {
            let form = {
                "IssuedVoucherId" : this.form.issuedVoucherId,
                "IssueQuantities" : this.form.issueQuantities,
                "IssueType": (this.form.issueType == 'online')? 1 : 2,
                "SendInfo": this.form.sendInfo,
                "PhoneNumber": (this.form.sendInfo == 'toPhone')? this.form.phoneNumber : '',
                "Email": (this.form.sendInfo == 'toEmail')? this.form.email : '',
                "IssuerName": this.form.issuerName,
                "IsPicked": (this.form.sendInfo == 'toPrint')? true : this.form.isPicked,
                // TODO
                // "BankAuthorizationRecordId": this.form.bankAuthorizationRecordId
                // "PickedNo": this.form.pickedNo
            };
            // console.log('Test:'+this.form.phoneNumber);
            // let self = this;

            axios({
                method: 'post',
                url: "/api/PickEVoucher",
                headers: {
                    "content-type": "application/json"
                },
                data: form
            }).then(response => {
                console.log(response);
                self.router.push({ name: 'list-pickevoucher' });
            })
                .catch(error => {
                    console.log(this.form);
                    console.log(error);
                });
        },
    }
}
</script>
