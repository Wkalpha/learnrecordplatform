<template>
  <Layout :pagetitle="'發行票券'">
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
                                <div class="mb-3">
                                    尚可發行數量：{{(form.issuedLimit &lt;= -999 ? '無上限':form.issuedLimit+' 張')}}
                                </div>
                            </div>
                            <div class="row" v-show="form.issueByAPI || form.issueByOnline || form.issueByPaper">
                                <div class="mb-3">
                                    發行方式
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-check-inline" v-show="form.issueByAPI">
                                        <input class="form-check-input" type="radio"
                                                id="API" value="API" name="typeRadios" v-model="form.voucherType">
                                        <label class="form-check-label">
                                            API
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline" v-show="form.issueByOnline">
                                        <input class="form-check-input" type="radio"
                                                id="online" value="online" name="typeRadios" v-model="form.voucherType">
                                        <label class="form-check-label">
                                            電子票券
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline" v-show="form.issueByPaper">
                                        <input class="form-check-input" type="radio"
                                                id="paper" value="paper" name="typeRadios" v-model="form.voucherType">
                                        <label class="form-check-label">
                                            紙本票券
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="form.voucherType == 'API'">
                                <div class="mb-3">
                                    TODO - API
                                </div>
                            </div>
                            <div class="row" v-else-if="form.voucherType == 'online'">
                                <div class="mb-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="phone" value="toPhone" name="sendRadios" v-model="form.sendInfo">
                                        <label class="form-check-label">
                                            手機
                                        </label>
                                    </div>
                                    <!-- TODO -->
                                    <!-- <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="paper" value="toPhoneNumberBatch" name="typeRadios" v-model="form.issueType">
                                        <label class="form-check-label">
                                            手機批次
                                        </label>
                                    </div> -->
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="email" value="toEmail" name="sendRadios" v-model="form.sendInfo">
                                        <label class="form-check-label">
                                            信箱
                                        </label>
                                    </div>
                                    <!-- TODO -->
                                    <!-- <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="paper" value="toEmailBatch" name="typeRadios" v-model="form.issueType">
                                        <label class="form-check-label">
                                            信箱批次
                                        </label>
                                    </div> -->
                                </div>
                            </div>
                            <div class="row" v-else-if="form.voucherType == 'paper'">
                                <div class="mb-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="phone" value="toPhone" name="sendRadios" v-model="form.sendInfo">
                                        <label class="form-check-label">
                                            手機
                                        </label>
                                    </div>
                                    <!-- TODO -->
                                    <!-- <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="paper" value="toPhoneNumberBatch" name="typeRadios" v-model="form.issueType">
                                        <label class="form-check-label">
                                            手機批次
                                        </label>
                                    </div> -->
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="email" value="toEmail" name="sendRadios" v-model="form.sendInfo">
                                        <label class="form-check-label">
                                            信箱
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="print" value="toPrint" name="sendRadios" v-model="form.sendInfo">
                                        <label class="form-check-label">
                                            直接列印
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-show="form.sendInfo">
                                <div class="mb-3" v-if="form.sendInfo == 'toPhone'">
                                    請輸入手機號碼
                                    <div>
                                        <input type="text" v-model="form.phoneNumber">
                                    </div>
                                </div>
                                <div class="mb-3" v-else-if="form.sendInfo == 'toEmail'">
                                    請輸入電子信箱
                                    <div>
                                        <input type="text" v-model="form.email">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="mb-3">
                                    發行張數
                                </div>
                                <div class="mb-3">
                                    <input type="number" v-model="form.issueQuantities">
                                </div>
                            </div>
                            <div class="row" v-if="form.sendInfo != 'toPrint'">
                                <div class="col-md-6">
                                <div class="mb-3">
                                    <input
                                    type="checkbox"
                                    checked
                                    v-model="form.isPicked"
                                    id="formrow-isPicked-input"
                                    />
                                    <label for="formrow-isPicked-input" class="form-label">立即取票</label>
                                </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 mb-3">
                                    <button type="submit" @click.prevent="save" class="btn btn-primary w-md">發行</button>
                                </div>
                                <div class="col-2 mb-3">
                                    <button type="submit" @click.prevent="prev" class="btn btn-primary w-md">回上頁</button>
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
        const voucherId = route.params.voucherId;
        const rules = {
            slotNumber : {required}
        };

        const form = ref({
            voucherId : voucherId,
            voucherName : '',
            voucherType: Int8Array,
            voucherTermData: [],
            issueQuantities: 0,
            issueType: Int8Array,
            issuerName: String,
            issueByAPI: Boolean,
            issueByOnline: Boolean,
            issueByPaper: Boolean,
            sendInfo: String,
            phoneNumber: '',
            email: '',
            issuedLimit: 0,
            isPicked: Boolean
            // TODO
            // BankAuthorizationRecordId 信託授權紀錄 Id
        });

        const v$ = useVuelidate(rules, form);

        onMounted(async () => {
            const base_url = '/api/QueryVoucher';
            const type_init = { method: 'GET', accept: 'application/json', headers: {} };
            form.value = await fetch(`${base_url}?VoucherId=${voucherId}`, type_init)
                .then(response => response.json()).then(data => data.value);
            // form.value.issueByOnline = true;
            // form.value.issueByAPI = true;
        },);
        return { v$, form, router };
    },
    // watch:{
    //     voucherId:{
    //         immediate:true,
    //         handler(newValue, oldValue){
    //             console.log(newValue, oldValue);
    //         }
    //     }
    // },
    methods: {
        test(){
            console.log(this.form.sendInfo);
            console.log(this.form.issueType);
        },
        prev() {
            this.$router.push({ name: "list-issuevoucher" });
        },
        save: function () {
            this.doPost();
        },
        doPost() {
            let form = {
                "VoucherId" : this.form.voucherId,
                "IssueQuantities" : this.form.issueQuantities,
                "VoucherType": (this.form.voucherType == 'online')? 1 : 2,
                "VoucherName": this.form.voucherName,
                "IssueType": this.form.issueType,
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
            let self = this;
            switch(this.form.sendInfo){
                case 'toPhone':
                    form.IssueType = 1;
                    break;
                case 'toEmail':
                    form.IssueType = 2;
                    break;
                case 'toPrint':
                    form.IssueType = 3;
                    break;
                default:
                    0;
            }
            axios({
                method: 'post',
                url: "/api/CreateIssuedVoucher",
                headers: {
                    "content-type": "application/json"
                },
                data: form
            }).then(response => {
                console.log(response);
                self.router.push({ name: 'list-issuevoucher' });
            })
                .catch(error => {
                    console.log(this.form);
                    console.log(error);
                });
        },
    }
}
</script>
