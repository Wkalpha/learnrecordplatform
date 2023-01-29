<template>
    <Layout :pagetitle="title">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">供應商資訊</h4>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row mb-3">
                                <label for="supplier-category" class="col-1 col-form-label">選擇類別</label>
                                <label for="main-category" class="col-1 col-form-label">大類別</label>
                                <div class="col-3">
                                    <select id="main-category" class="form-select"
                                            @change="setSubCategoryDropdownlist($event.target.selectedIndex)">
                                        <option selected>請選擇</option>
                                        <option v-for="(data, index) in mainCategory"
                                                :value="mainCategory.mainCategoryId" :key="index">{{ data.name }}
                                        </option>
                                    </select>
                                </div>
                                <label for="sub-category" class="col-1 col-form-label">小類別</label>
                                <div class="col-3">
                                    <select id="sub-category" class="form-select">
                                        <option selected value="0">請選擇</option>
                                        <option v-for="(data, index) in subCategory" :key="index">{{ data.subName }}
                                        </option>
                                    </select>
                                </div>

                            </div>
                            <div class="row mb-3">
                                <label for="supplier-name" class="col-sm-2 col-form-label">供應商名稱</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="supplier-name"
                                           v-model="supplierData.supplierName"/>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="business-name" class="col-sm-2 col-form-label">營業名稱</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="business-name"
                                           v-model="supplierData.businessName"/>
                                </div>
                            </div>
                            <div class="mb-1 row">
                                <label for="address" class="col-md-2 col-form-label">地址</label>
                                <div class="col-lg-1">
                                    <div class="mb-3">
                                        <select id="address-select" class="form-select" @change="concatAddressSelect"
                                                v-model="addressData.addressSelect">
                                            <option selected>請選擇</option>
                                            <option>基隆市</option>
                                            <option>台北市</option>
                                            <option>新北市</option>
                                            <option>桃園縣</option>
                                            <option>新竹市</option>
                                            <option>新竹縣</option>
                                            <option>苗栗縣</option>
                                            <option>台中市</option>
                                            <option>彰化縣</option>
                                            <option>南投縣</option>
                                            <option>雲林縣</option>
                                            <option>嘉義市</option>
                                            <option>嘉義縣</option>
                                            <option>台南市</option>
                                            <option>高雄市</option>
                                            <option>屏東縣</option>
                                            <option>台東縣</option>
                                            <option>花蓮縣</option>
                                            <option>宜蘭縣</option>
                                            <option>澎湖縣</option>
                                            <option>金門縣</option>
                                            <option>連江縣</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input class="form-control" type="text" id="address-input"
                                           v-model="concatAddressInput">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="uniform-no" class="col-sm-2 col-form-label">統一編號</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="uniform-no"
                                           v-model="supplierData.uniformNo"/>
                                </div>
                            </div>
                            <!--                            <div class="row mb-3">-->
                            <!--                                <label for="account" class="col-sm-2 col-form-label">帳號</label>-->
                            <!--                                <div class="col-sm-3">-->
                            <!--                                    <input type="text" class="form-control" id="account"-->
                            <!--                                        v-model="supplierData.account" />-->
                            <!--                                </div>-->
                            <!--                                <label for="password" class="col-sm-1 col-form-label">密碼</label>-->
                            <!--                                <div class="col-sm-3">-->
                            <!--                                    <input type="text" class="form-control" id="password"-->
                            <!--                                        v-model="supplierData.password" />-->
                            <!--                                </div>-->
                            <!--                            </div>-->
                            <div class="row mb-3">
                                <label for="contact" class="col-sm-2 col-form-label">聯絡人</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="contact"
                                           v-model="supplierData.contact"/>
                                </div>
                                <label for="contact-phone" class="col-sm-1 col-form-label">聯絡人電話</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="contact-phone"
                                           v-model="supplierData.contactPhone"/>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="contact-mobile" class="col-sm-2 col-form-label">聯絡人手機</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="contact-mobile"
                                           v-model="supplierData.contactMobile"/>
                                </div>
                                <label for="contact-email" class="col-sm-1 col-form-label">聯絡人信箱</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="contact-email"
                                           v-model="supplierData.contactEmail"/>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="bank-code" class="col-sm-2 col-form-label">撥款帳戶銀行代碼</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="bank-code"
                                           v-model="supplierData.bankCode"/>
                                </div>
                                <label for="allocate-account" class="col-sm-1 col-form-label">撥款帳號</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="allocate-account"
                                           v-model="supplierData.allocateAccount"/>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">供應商 - 門市(分店)資訊</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            PS:上傳分店檔案或手動新增資料二擇一
                                        </div>

                                    </div>
                                    <div class="row">
                                        <label for="formFile" class="col-sm-2 col-form-label">上傳 Excel</label>
                                        <div class="col-sm-3">
                                            <input class="form-control" type="file" id="formFile">
                                        </div>
                                        <div class="col-sm-3">
                                            <button type="button" class="btn btn-primary waves-effect waves-light">
                                                下載範例
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="row mb-3">
                                        <div class="col-2">
                                            <label class="form-label">門市/分店名稱</label>
                                            <div>
                                                <input type="text" class="form-control" id="add-store"
                                                       v-model="addStoreTemp.supplierName"/>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <label class="form-label">編號(門市/分店編號)</label>
                                            <div>
                                                <input type="text" class="form-control" id="store-no"
                                                       v-model="addStoreTemp.storeNo"/>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <label class="form-label">帳號</label>
                                            <div>
                                                <input type="text" class="form-control" id="store-no"
                                                       v-model="addStoreTemp.account"/>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <label class="form-label">密碼</label>
                                            <div>
                                                <input type="text" class="form-control" id="store-no"
                                                       v-model="addStoreTemp.password"/>
                                            </div>
                                        </div>
                                        <div class="col-2 d-flex align-items-end">
                                            <button type="button"
                                                    class="btn btn-outline-success waves-effect waves-light"
                                                    @click="addStore">
                                                新增
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table mb-0" v-show="supplierData.storeDtos.length > 0">
                                        <thead class="table-light">
                                        <tr>
                                            <th>序號</th>
                                            <th>是否為總店</th>
                                            <th>門市/分店名稱</th>
                                            <th>編號(門市/分店編號)</th>
                                            <th>帳號</th>
                                            <th>密碼</th>
                                            <th>功能</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(data, index) in supplierData.storeDtos" :key="index"
                                            class="align-middle">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td style="width: 14.2%">
                                                <input type="checkbox" class="form-check-input"
                                                       id="horizontal-customCheck" v-model="data.isMain">
                                            </td>
                                            <td style="width: 14.2%"><input type="text" class="form-control"
                                                                            id="store-name"
                                                                            v-model="data.supplierName"/></td>
                                            <td style="width: 14.2%"><input type="text" class="form-control"
                                                                            id="store-no" v-model="data.storeNo"/></td>
                                            <td style="width: 14.2%"><input type="text" class="form-control"
                                                                            id="store-account" v-model="data.account"/>
                                            </td>
                                            <td style="width: 14.2%"><input type="text" class="form-control"
                                                                            id="store-password"
                                                                            v-model="data.password"/></td>
                                            <td style="width: 14.2%">
                                                <div class="d-flex flex-wrap gap-2">
                                                    <button type="button" @click.prevent="removeStore(index)"
                                                            class="btn btn-outline-danger waves-effect waves-light">
                                                        刪除
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="mb-3">
                                    <div>
                                        <button type="button" @click.prevent="createSupplier"
                                                class="btn btn-primary waves-effect waves-light">
                                            完成編輯
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>


<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import axios from 'axios';
import {reactive} from "vue";
import {toDataSourceRequestString} from '@progress/kendo-data-query';

/**
 * Create Supplier component
 */
export default {
    mounted: function () {
        this.fetchData({skip: this.skip, take: this.take});
    },
    name: "App",
    page: {
        title: "Create Supplier",
        meta: [{name: "description", content: appConfig.description}],
    },
    components: {Layout},
    setup() {
        const addStoreTemp = reactive({
            supplierName: '',
            storeNo: '',
            account: '',
            password: ''
        });
        const addressData = reactive({
            addressSelect: '請選擇',
            addressInput: ''
        })
        const supplierData = reactive({
            issuerId: "I2022123100000001", // test
            isMain: true,
            mainCategory: 1,
            subCategory: 2,
            supplierName: '',
            businessName: '',
            address: '',
            uniformNo: '',
            account: '',
            password: '',
            contact: '',
            contactPhone: '',
            contactMobile: '',
            contactEmail: '',
            bankCode: '',
            allocateAccount: '',
            allocateAccountName: 'Justin',
            storeDtos: []
        });
        return {supplierData, addStoreTemp, addressData};
    },
    data() {
        return {
            title: "新增供應商",
            mainCategory: [],
            subCategory: [],
            mainCategoryId: '',
            subCategoryId: '',
        };
    },
    methods: {
        createSupplier() {
            let url = '/api/CreateSupplier';
            axios.post(url, this.supplierData).then((response) => {
                console.log(response.data);
                // TODO
                // redirect URL
            });
        },
        addStore() {
            let storeDto = {
                isMain: false,
                supplierName: this.addStoreTemp.supplierName,
                storeNo: this.addStoreTemp.storeNo,
                account: this.addStoreTemp.account,
                password: this.addStoreTemp.password
            };
            this.supplierData.storeDtos.push(storeDto);
            this.clearTemp();
        },
        clearTemp() {
            this.addStoreTemp.supplierName = '';
            this.addStoreTemp.storeNo = '';
            this.addStoreTemp.account = '';
            this.addStoreTemp.password = '';
        },
        removeStore(index) {
            this.supplierData.storeDtos.splice(index, 1);
        },
        concatAddressSelect() {
            this.supplierData.address = `${this.addressData.addressSelect}${this.addressData.addressInput}`;
        },
        fetchData: function (dataState) {
            const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
            const base_url = '/api/QuerySupplierCategory';
            const init = {method: 'GET', accept: 'application/json', headers: {}};
            fetch(`${base_url}?${queryStr}`, init)
                .then(response => response.json()
                    .then(text => {
                        this.mainCategory = text
                    }));
        },
        setSubCategoryDropdownlist(mainCategoryId) {
            document.getElementById("sub-category").value = 0;
            this.subCategory = [];
            if (mainCategoryId != 0) this.subCategory = this.mainCategory[mainCategoryId - 1].supplierSubCategories;
        },
    },
    computed: {
        concatAddressInput: {
            get: function () {
                return this.addressData.addressInput;
            },
            set: function (newValue) {
                this.addressData.addressInput = newValue;
                this.supplierData.address = `${this.addressData.addressSelect}${newValue}`;
            }
        }
    },
};
</script>