<template>
    <Layout :pagetitle="'新增票券'">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="p-1">
                    </div>
                    <!-- end card header -->
                    <div class="card-body">
                        <form action="#">
                            <ul class="wizard-nav mb-5">
                                <li class="wizard-list-item">
                                    <div class="list-item">
                                        <div
                                            class="step-icon"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Voucher Details"
                                        >
                                            <i class="bx bx-user-circle"></i>
                                        </div>
                                    </div>
                                </li>
                                <li class="wizard-list-item">
                                    <div class="list-item">
                                        <div
                                            class="step-icon"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Issuer Details"
                                        >
                                            <i class="bx bx-file"></i>
                                        </div>
                                    </div>
                                </li>

                                <li class="wizard-list-item">
                                    <div class="list-item">
                                        <div
                                            class="step-icon"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Voucher Number Rules"
                                        >
                                            <i class="bx bx-edit"></i>
                                        </div>
                                    </div>
                                </li>

                                <li class="wizard-list-item">
                                    <div class="list-item">
                                        <div
                                            class="step-icon"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Voucher Rules"
                                        >
                                            <i class="bx bx-edit"></i>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <!-- wizard-nav -->

                            <div class="wizard-tab">
                                <div class="text-center mb-4">
                                    <h5>票券內容</h5>
                                    <p class="card-title-desc">步驟一</p>
                                </div>
                                <div class="row">
                                    <div class="col-3">選擇類別</div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-3">
                                        <div>
                                            <label for="main-category" class="col-form-label">大類別</label>
                                        </div>
                                        <select id="main-category" class="form-select"
                                                @change="setSubCategoryDropdownlist($event.target.selectedIndex)">
                                            <option selected>請選擇</option>
                                            <option v-for="(data, index) in mainCategory"
                                                    :value="mainCategory.mainCategoryId" :key="index">{{
                                                    data.name
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-3">
                                        <div>
                                            <label for="sub-category" class="col-form-label">小類別</label>
                                        </div>
                                        <select id="sub-category" class="form-select"
                                                @change="setSubCategoryId($event.target.selectedIndex)">
                                            <option selected value="0">請選擇</option>
                                            <option v-for="(data, index) in subCategory" :key="index">
                                                {{ data.subName }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3">票券種類</div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col-3">
                                        <div>
                                            <label for="typeRadios1" class="col-form-label"></label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="typeRadios"
                                                   id="typeRadios1" value="V" v-model="voucherData.voucherType"
                                                   checked>
                                            <label class="form-check-label" for="typeRadios1">
                                                履約券
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="typeRadios"
                                                   id="typeRadios2" value="F" v-model="voucherData.voucherType">
                                            <label class="form-check-label" for="typeRadios2">
                                                贈品券
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-7">
                                        <div>
                                            <label for="voucher-name" class="col-form-label">票券名稱</label>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="voucher-name"
                                            v-model="voucherData.voucherName"
                                        />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-2">優惠日期</div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col-md-2">
                                        <div class="form-check form-check-inline">
                                            <label class="form-check-label" for="disDateRadios1">
                                                <input class="form-check-input" type="radio" name="disDateRadios"
                                                       id="disDateRadios1" checked value="1"
                                                       v-model="discountDateTypeInt">
                                                無優惠期
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="disDateRadios"
                                                   id="disDateRadios2" value="2" v-model="discountDateTypeInt">
                                            <label class="form-check-label" for="disDateRadios2">
                                                發行日起算
                                            </label>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="input-group">
                                                <input type="number" class="form-control"
                                                       :disabled="voucherData.discountDateType!==2"
                                                       v-model="voucherData.afterIssueDate">
                                                <span class="input-group-text" id="net">天</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-7">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="disDateRadios"
                                                   id="disDateRadios3" value="3" v-model="discountDateTypeInt">
                                            <label class="form-check-label" for="disDateRadios3">
                                                固定優惠期
                                            </label>
                                        </div>
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <input class="form-control" type="date"
                                                       id="example-date-input"
                                                       :disabled="voucherData.discountDateType!==3"
                                                       v-model="voucherData.discountDateStart">
                                            </div>
                                            <div class="col-1">～</div>
                                            <div class="col-4">
                                                <input class="form-control" type="date"
                                                       id="example-date-input"
                                                       :disabled="voucherData.discountDateType!==3"
                                                       v-model="voucherData.discountDateEnd">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">票券條文</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-4">
                                                <button
                                                    type="button"
                                                    class="btn btn-outline-primary waves-effect waves-light"
                                                    id="voucher-term"
                                                    @click="addTerm"
                                                >
                                                    新增條文
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table mb-0"
                                               v-show="voucherData.voucherTermsDtos.length > 0">
                                            <thead class="table-light">
                                            <tr>
                                                <th>序號</th>
                                                <th>條文</th>
                                                <th>功能</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(data, index) in voucherData.voucherTermsDtos"
                                                :key="index"
                                                class="align-middle">
                                                <th scope="row" style="width: 8%">{{ index + 1 }}</th>
                                                <td style="width: 75%"><input type="text" class="form-control"
                                                                              v-model="data.content"/></td>
                                                <td style="width: 17%">
                                                    <div class="d-flex flex-wrap gap-2">
                                                        <button type="button"
                                                                @click.prevent="removeStore(index)"
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
                            </div>
                            <!-- wizard-tab -->

                            <div class="wizard-tab">
                                <div>
                                    <div class="text-center mb-4">
                                        <h5>發行單位</h5>
                                        <p class="card-title-desc">步驟二</p>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <div>
                                                <label for="issuer-name" class="col-form-label">發行商</label>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="issuer-name"
                                                v-model="voucherData.issuerName"
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <div>
                                                <label for="issuer-head" class="col-form-label">負責人</label>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="issuer-head"
                                                v-model="voucherData.issuerHead"
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <div>
                                                <label for="issuer-uniformNo" class="col-form-label">統一編號</label>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="issuer-uniformNo"
                                                v-model="voucherData.issuerUniformNo"
                                            />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <div>
                                                <label for="issuer-address" class="col-form-label">地址</label>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="issuer-address"
                                                v-model="voucherData.issuerAddress"
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <div>
                                                <label for="issuer-capital" class="col-form-label">資本額</label>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="issuer-capital"
                                                v-model="voucherData.issuerCapital"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">信託帳戶</div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <div>
                                                <label for="main-category" class="col-form-label">銀行名稱</label>
                                            </div>
                                            <select id="main-category" class="form-select"
                                                    @change="setBankData($event.target.selectedIndex)">
                                                <option selected>請選擇</option>
                                                <option v-for="(data, index) in banks"
                                                        :value="banks.mainCode" :key="index">{{
                                                        data.bankName
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-3">
                                            <div>
                                                <label class="col-form-label">銀行代號</label>
                                            </div>
                                            <div>
                                                <label class="col-form-label">{{voucherData.mainCode}}</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div>
                                                <label class="col-form-label">信託帳號</label>
                                            </div>
                                            <div>
                                                <label class="col-form-label">{{voucherData.trustAccountNo}}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-2 p-3">信託存續天數</div>
                                    </div>
                                    <div class="row mb-2 align-items-center">
                                        <div class="align-items-center">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio"
                                                       name="maturityDayRadios"
                                                       id="maturityDayRadios1" value="365" v-model="maturityDayInt"
                                                       checked>
                                                <label class="form-check-label" for="maturityDayRadios1">
                                                    365天
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio"
                                                       name="maturityDayRadios"
                                                       id="maturityDayRadios2" value="540" v-model="maturityDayInt">
                                                <label class="form-check-label" for="maturityDayRadios2">
                                                    540天
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end form -->
                            </div>
                            <!-- wizard-tab -->

                            <div class="wizard-tab">
                                <div>
                                    <div class="text-center mb-4">
                                        <h5>票號規則</h5>
                                        <p class="card-title-desc">步驟三</p>
                                    </div>
                                    <div class="row">
                                        <div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-check-label" for="numberRadios1">
                                                            <input class="form-check-input" type="radio"
                                                                   name="numberRadios"
                                                                   id="numberRadios1" value="1"
                                                                   v-model="numberRuleInt" checked>
                                                            自訂票號(不得重複)
                                                        </label>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <div>
                                                                <label for="voucher-prefix-number1"
                                                                       class="col-form-label">前編碼</label>
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-prefix-number1"
                                                                    :disabled="voucherData.voucherNumberRule !== 1"
                                                                    v-model="voucherData.voucherPrefixNumber"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div>
                                                                <label for="voucher-serial-number-start1"
                                                                       class="col-form-label">後流水號</label>
                                                            </div>
                                                            <div class="input-group">
                                                                <div class="input-group-text">起</div>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-serial-number-start1"
                                                                    :disabled="voucherData.voucherNumberRule !== 1"
                                                                    v-model="voucherData.voucherSerialNumberStart"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-1">
                                                        <div>
                                                            <div class="form-check">
                                                                <label class="form-check-label" for="limitRadios1">
                                                                    <input class="form-check-input" type="radio"
                                                                           name="limitRadios" value="1"
                                                                           v-model="limitTemp.isLimit"
                                                                           id="limitRadios1" checked>
                                                                    無庫存上限
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3 align-items-center">
                                                        <div>
                                                            <div class="form-check mb-2">
                                                                <label class="form-check-label" for="limitRadios2">
                                                                    <input class="form-check-input" type="radio"
                                                                           name="limitRadios" value="2"
                                                                           v-model="limitTemp.isLimit"
                                                                           id="limitRadios2">
                                                                    上限張數
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="col-3">
                                                            <div class="input-group">
                                                                <input type="text" class="form-control"
                                                                       :disabled="limitTemp.isLimit!=='2'"
                                                                       v-model="voucherData.issuedLimit">
                                                                <span class="input-group-text" id="net">張</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-3">
                                                            <div>(庫存銷完時自動下架)</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="form-check form-check-inline mb-3">
                                                        <label class="form-check-label" for="numberRadios2">
                                                            <input class="form-check-input" type="radio"
                                                                   name="numberRadios"
                                                                   id="numberRadios2" value="2"
                                                                   v-model="numberRuleInt">
                                                            匯入票號檔案
                                                        </label>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <input class="form-control" type="file" id="formFile"
                                                                   :disabled="voucherData.voucherNumberRule !== 2">
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <button
                                                                type="button"
                                                                class="btn btn-primary waves-effect waves-light"
                                                                :disabled="voucherData.voucherNumberRule !== 2"
                                                            >
                                                                下載範例
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-check-label" for="numberRadios3">
                                                            <input class="form-check-input" type="radio"
                                                                   name="numberRadios"
                                                                   id="numberRadios3" value="3"
                                                                   v-model="numberRuleInt">
                                                            約定票券批號
                                                        </label>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <div>
                                                                <label for="voucher-prefix-number2"
                                                                       class="col-form-label">前編碼</label>
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-prefix-number2"
                                                                    :disabled="voucherData.voucherNumberRule !== 3"
                                                                    v-model="voucherData.voucherPrefixNumber"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div>
                                                                <label for="voucher-serial-number-start2"
                                                                       class="col-form-label">後流水號</label>
                                                            </div>
                                                            <div class="input-group">
                                                                <div class="input-group-text">起</div>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-serial-number-start2"
                                                                    :disabled="voucherData.voucherNumberRule !== 3"
                                                                    v-model="voucherData.voucherSerialNumberStart"
                                                                />
                                                            </div>
                                                            <div class="p-1"></div>
                                                            <div class="input-group">
                                                                <div class="input-group-text">迄</div>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-serial-number-end"
                                                                    :disabled="voucherData.voucherNumberRule !== 3"
                                                                    v-model="voucherData.voucherSerialNumberEnd"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end form -->
                                </div>
                            </div>
                            <!-- wizard-tab -->

                            <div class="wizard-tab">
                                <div>
                                    <div class="text-center mb-4">
                                        <h5>票券規則</h5>
                                        <p class="card-title-desc">步驟四</p>
                                    </div>
                                    <div class="row">
                                        <h5>票券形式</h5>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div>
                                                <div class="form-check mb-3 form-check-inline">
                                                    <input class="form-check-input" type="checkbox"
                                                           id="voucherFormCheck1" v-model="voucherData.issueByApi">
                                                    <label class="form-check-label" for="voucherFormCheck1">
                                                        API 取號
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox"
                                                           id="voucherFormCheck2"
                                                           v-model="voucherData.issueByOnline">
                                                    <label class="form-check-label" for="voucherFormCheck2">
                                                        電子票券
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox"
                                                           id="voucherFormCheck3"
                                                           v-model="voucherData.issueByPaper">
                                                    <label class="form-check-label" for="voucherFormCheck3">
                                                        紙本票券
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <h5>票券成本</h5>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <div>
                                                <label
                                                    for="net"
                                                    class="col-form-label"
                                                >NET</label
                                                >
                                            </div>
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" v-model="voucherData.net">
                                                    <span class="input-group-text" id="net">元</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div>
                                                <label
                                                    for="price"
                                                    class="col-form-label"
                                                >售價</label
                                                >
                                            </div>
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                           v-model="voucherData.sellPrice">
                                                    <span class="input-group-text" id="price">元</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div>
                                                <label
                                                    for="sticker-price"
                                                    class="col-form-label"
                                                >牌價</label
                                                >
                                            </div>
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                           v-model="voucherData.stickerPrice">
                                                    <span class="input-group-text" id="sticker-price">元</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div>
                                                <label
                                                    for="pos-discount-price"
                                                    class="col-form-label"
                                                >POS抵用金額</label
                                                >
                                            </div>
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                           v-model="voucherData.posdiscountPrice">
                                                    <span class="input-group-text" id="pos-discount-price">元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <div>
                                                <label
                                                    for="commission"
                                                    class="col-form-label"
                                                >傭金</label
                                                >
                                            </div>
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                           v-model="voucherData.commission">
                                                    <span class="input-group-text" id="commission">%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div>
                                                <label
                                                    for="advertising-fee"
                                                    class="col-form-label"
                                                >廣告費</label
                                                >
                                            </div>
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                           v-model="voucherData.advertisingFee">
                                                    <span class="input-group-text" id="advertising-fee">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div>
                                            <label for="example-date-input"
                                                   class="col-md-2 col-form-label">商品到期日</label>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <input class="form-control" type="date"
                                                   id="example-date-input" v-model="voucherData.expiredDate">
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">特店多分店核銷</h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div>
                                                    <multiselect v-model="voucherData.reimbursedUnitsDtos"
                                                                 :options="storeData"
                                                                 :multiple="true"
                                                                 group-values="stores" group-label="businessName"
                                                                 :group-select="true"
                                                                 placeholder="Type to search" track-by="displayName"
                                                                 label="displayName">
                                                        <template v-slot:noResult><span>查無此分店</span></template>
                                                    </multiselect>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div style="overflow:auto">
                                                    <div class="language-json"
                                                         v-for="(data, index) in voucherData.reimbursedUnitsDtos"
                                                         :key="index">{{ data.displayName }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex align-items-start gap-3 mt-4">
                                <button
                                    type="button"
                                    class="btn btn-primary w-sm"
                                    id="prevBtn"
                                    @click="nextPrev(-1)"
                                >
                                    上一步
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-primary w-sm ms-auto"
                                    id="nextBtn"
                                    @click="nextPrev(1)"
                                >
                                    下一步
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import {reactive} from "vue";
import axios from 'axios';
import {toDataSourceRequestString} from "@progress/kendo-data-query";
import Multiselect from 'vue-multiselect';

export default {
    data() {
        return {
            currentTab: 0,
            mainCategory: [],
            subCategory: [],
            storeData: [],
            banks: [],
            mainCode: '',
            trustAccount: ''
        };
    },
    components: {
        Layout,
        Multiselect
    },
    mounted() {
        this.showTab(this.currentTab);
        this.fetchCates({skip: this.skip, take: this.take});
        this.fetchBanks();
    },
    setup() {
        const limitTemp = reactive({
            isLimit: 1
        });
        const addTermTemp = reactive({
            content: ''
        });
        const voucherData = reactive({
            issuerId: 'I2023011800000001',
            voucherMainCategoryId: 0,
            voucherSubCategoryId: 0,
            voucherName: '',
            voucherType: 'V',
            voucherNumberRule: 1,
            voucherPrefixNumber: '',
            voucherSerialNumberStart: null,
            voucherSerialNumberEnd: null,
            issuedLimit: null,
            isLaunched: false,
            trustMaturityDay: 365,
            discountDateType: 1,
            afterIssueDate: null,
            discountDateStart: null,
            discountDateEnd: null,
            issuerName: '',
            issuerHead: '',
            issuerUniformNo: '',
            issuerAddress: '',
            issuerCapital: null,
            net: null,
            sellPrice: null,
            commission: null,
            advertisingFee: null,
            stickerPrice: null,
            posdiscountPrice: null,
            issueByApi: false,
            issueByOnline: false,
            issueByPaper: false,
            mainCode: '',
            trustAccountNo: '',
            voucherTermsDtos: [],
            reimbursedUnitsDtos: []
        });
        return {addTermTemp, voucherData, limitTemp};
    },
    methods: {
        showTab(n) {
            // This function will display the specified tab of the form...
            var x = document.getElementsByClassName("wizard-tab");
            x[n].style.display = "block";
            //... and fix the Previous/Next buttons:
            if (n == 0) {
                document.getElementById("prevBtn").style.display = "none";
            } else {
                document.getElementById("prevBtn").style.display = "inline";
            }
            if (n == x.length - 1) {
                document.getElementById("nextBtn").innerHTML = "完成編輯";
                document.getElementById("nextBtn").addEventListener("click", this.createVoucher);
            } else {
                document.getElementById("nextBtn").innerHTML = "下一步";
                document.getElementById("nextBtn").removeEventListener("click", this.createVoucher);
            }
            //... and run a function that will display the correct step indicator:
            this.fixStepIndicator(n);
        },
        nextPrev(n) {
            // This function will figure out which tab to display
            var x = document.getElementsByClassName("wizard-tab");
            this.branchClickEvent(this.currentTab)
            // Hide the current tab:
            x[this.currentTab].style.display = "none";
            // Increase or decrease the current tab by 1:
            this.currentTab = this.currentTab + n;
            // if you have reached the end of the form...
            if (this.currentTab >= x.length) {
                this.currentTab = this.currentTab - n;
                x[this.currentTab].style.display = "block";
            }

            // Otherwise, display the correct tab:
            this.showTab(this.currentTab);
        },
        fixStepIndicator(n) {
            // This function removes the "active" class of all steps...
            var i,
                x = document.getElementsByClassName("list-item");
            for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
            }
            //... and adds the "active" class on the current step:
            x[n].className += " active";
        },
        createVoucher() {
            let url = '/api/CreateVoucher';
            axios.post(url, this.voucherData).then((response) => {
                console.log(response.data)
            });
        },
        addTerm() {
            let termDto = {
                content: this.addTermTemp.content
            };
            this.voucherData.voucherTermsDtos.push(termDto);
            this.clearTemp();
        },
        clearTemp() {
            this.addTermTemp.content = '';
        },
        removeStore(index) {
            this.voucherData.voucherTermsDtos.splice(index, 1);
        },
        fetchCates: function (dataState) {
            const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
            const base_url = '/api/QueryVoucherCategory';
            const init = {method: 'GET', accept: 'application/json', headers: {}};
            fetch(`${base_url}?${queryStr}`, init)
                .then(response => response.json()).then(data => this.mainCategory = data);
        },
        fetchBanks: function () {
            const base_url = '/api/QueryBankIssuerByUniform';
            const init = {method: 'GET', accept: 'application/json', headers: {}};
            fetch(`${base_url}?UniformNo=12345678`, init)
                .then(response => response.json()).then(data => this.banks = data.value);
        },
        setSubCategoryDropdownlist(mainCategoryId) {
            document.getElementById("sub-category").value = 0;
            this.subCategory = [];
            this.voucherData.voucherMainCategoryId = mainCategoryId;
            this.voucherData.voucherSubCategoryId = 0;
            if (mainCategoryId !== 0) this.subCategory = this.mainCategory[mainCategoryId - 1].voucherSubCategories;
        },
        setBankData(code) {
            let bank = this.banks[code-1];
            this.voucherData.mainCode = bank.mainCode;
            this.voucherData.trustAccountNo = bank.trustAccountNo;
        },
        setSubCategoryId(subCategoryId) {
            console.log(subCategoryId)
            this.voucherData.voucherSubCategoryId = subCategoryId;
        },
        branchClickEvent(n) {
            if (n == 1) {
                this.setIssuerId();
            } else if (n == 2) {
                this.setStores();
            }
        },
        setIssuerId() {
            let url = `/api/QueryIssuerId?CompanyName=${this.voucherData.issuerName}`;
            axios.get(url).then((response) => {
                this.voucherData.issuerId = response.data.value.issuerId;
            });
        },
        setStores() {
            let url = `/api/QuerySupplierByIssuer?IssuerId=${this.voucherData.issuerId}`;
            axios.get(url).then((response) => {
                // response.data.value.forEach(x=>this.storeData.push({name:x.businessName,stores:[]}))
                for (let storeData of response.data.value) {
                    let store = {};
                    store['businessName'] = storeData.businessName;
                    store['stores'] = [];
                    store['stores'].push({
                        displayName: `${storeData.businessName}-${storeData.supplierName}`,
                        supplierName: storeData.supplierName,
                        isMain: storeData.isMain,
                        supplierUniformNo: storeData.uniformNo,
                        storeNo: storeData.storeNo,
                        supplierId: storeData.supplierId
                    })
                    for (let storeDatum of storeData.storeData) {
                        store['stores'].push({
                            displayName: `${storeData.businessName}-${storeDatum.supplierName}`,
                            supplierName: storeDatum.supplierName,
                            isMain: storeDatum.isMain,
                            supplierUniformNo: storeDatum.uniformNo,
                            storeNo: storeDatum.storeNo,
                            supplierId: storeDatum.supplierId
                        })
                    }
                    this.storeData.push(store);
                }
            });
            console.log(this.storeData);
        }
    },
    computed: {
        maturityDayInt: {
            get: function () {
                return this.voucherData.trustMaturityDay;
            },
            set: function (newValue) {
                this.voucherData.trustMaturityDay = parseInt(newValue);
            }
        },
        numberRuleInt: {
            get: function () {
                return this.voucherData.voucherNumberRule;
            },
            set: function (newValue) {
                this.voucherData.voucherNumberRule = parseInt(newValue);
            }
        },
        discountDateTypeInt: {
            get: function () {
                return this.voucherData.discountDateType;
            },
            set: function (newValue) {
                this.voucherData.discountDateType = parseInt(newValue);
            }
        }
    }
};
</script>

<style src="vue-multiselect/dist/dist/vue-multiselect.css"></style>