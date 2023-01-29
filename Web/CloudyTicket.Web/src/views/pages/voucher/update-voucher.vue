<template>
    <Layout :pagetitle="'修改票券'">
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
                                            <option>請選擇</option>
                                            <option v-for="(data, index) in mainCategory"
                                                    :value="mainCategory.mainCategoryId" :key="index"
                                                    :selected="index===form.voucherMainCategoryId-1">{{
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
                                            <option v-for="(data, index) in subCategory" :key="index"
                                                    :selected="index===form.voucherSubCategoryId-1">
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
                                                   id="typeRadios1" value="V" v-model="form.voucherType"
                                                   checked>
                                            <label class="form-check-label" for="typeRadios1">
                                                履約券
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="typeRadios"
                                                   id="typeRadios2" value="F" v-model="form.voucherType">
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
                                            v-model="form.voucherName"
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
                                                       :disabled="form.discountDateType!==2"
                                                       v-model="form.afterIssueDate">
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
                                                       :disabled="form.discountDateType!==3"
                                                       v-model="form.discountDateStart">
                                            </div>
                                            <div class="col-1">～</div>
                                            <div class="col-4">
                                                <input class="form-control" type="date"
                                                       id="example-date-input"
                                                       :disabled="form.discountDateType!==3"
                                                       v-model="form.discountDateEnd">
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
                                               v-show="form.voucherTermData.length > 0">
                                            <thead class="table-light">
                                            <tr>
                                                <th>序號</th>
                                                <th>條文</th>
                                                <th>功能</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(data, index) in form.voucherTermData"
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
                                                v-model="form.issuerName"
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
                                                v-model="form.issuerHead"
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
                                                v-model="form.issuerUniformNo"
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
                                                v-model="form.issuerAddress"
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
                                                v-model="form.issuerCapital"
                                            />
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
                                                                    :disabled="form.voucherNumberRule !== 1"
                                                                    v-model="form.voucherPrefixNumber"
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
                                                                    :disabled="form.voucherNumberRule !== 1"
                                                                    v-model="form.voucherSerialNumberStart"
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
                                                                       v-model="form.issuedLimit">
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
                                                                   :disabled="form.voucherNumberRule !== 2">
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <button
                                                                type="button"
                                                                class="btn btn-primary waves-effect waves-light"
                                                                :disabled="form.voucherNumberRule !== 2"
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
                                                                    :disabled="form.voucherNumberRule !== 3"
                                                                    v-model="form.voucherPrefixNumber"
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
                                                                    :disabled="form.voucherNumberRule !== 3"
                                                                    v-model="form.voucherSerialNumberStart"
                                                                />
                                                            </div>
                                                            <div class="p-1"></div>
                                                            <div class="input-group">
                                                                <div class="input-group-text">迄</div>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-serial-number-end"
                                                                    :disabled="form.voucherNumberRule !== 3"
                                                                    v-model="form.voucherSerialNumberEnd"
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
                                                           id="voucherFormCheck1" v-model="form.issueByApi">
                                                    <label class="form-check-label" for="voucherFormCheck1">
                                                        API 取號
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox"
                                                           id="voucherFormCheck2"
                                                           v-model="form.issueByOnline">
                                                    <label class="form-check-label" for="voucherFormCheck2">
                                                        電子票券
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox"
                                                           id="voucherFormCheck3"
                                                           v-model="form.issueByPaper">
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
                                                    <input type="text" class="form-control" v-model="form.net">
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
                                                           v-model="form.sellPrice">
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
                                                           v-model="form.stickerPrice">
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
                                                           v-model="form.posdiscountPrice">
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
                                                           v-model="form.commission">
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
                                                           v-model="form.advertisingFee">
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
                                                   id="example-date-input" v-model="form.expiredDate">
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">特店多分店核銷</h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div>
                                                    <multiselect v-model="selectedStores"
                                                                 :options="optionStoreData"
                                                                 :multiple="true"
                                                                 group-values="stores" group-label="businessName"
                                                                 :group-select="true"
                                                                 placeholder="Type to search" track-by="supplierId"
                                                                 label="displayName">
                                                        <template v-slot:noResult><span>查無此分店</span></template>
                                                    </multiselect>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div style="overflow:auto">
                                                    <div class="language-json"
                                                         v-for="(data, index) in selectedStores"
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
import {onMounted, reactive, ref} from "vue";
import axios from 'axios';
import {useRoute, useRouter} from "vue-router";
import {toDataSourceRequestString} from "@progress/kendo-data-query";
import moment from "moment";
import Multiselect from 'vue-multiselect';

export default {
    data() {
        return {
            currentTab: 0,
            mainCategory: [],
            subCategory: [],
            optionStoreData: [],
            selectedStores: [],
            newExpireDate: ''
        };
    },
    components: {
        Layout,
        Multiselect
    },
    mounted() {
        this.showTab(this.currentTab);
        this.fetchData({skip: this.skip, take: this.take});
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const voucherId = route.params.voucherId;
        const form = ref({
            voucherId: '',
            issuerId: '',
            voucherMainCategoryId: null,
            voucherSubCategoryId: null,
            voucherName: '',
            voucherType: '',
            voucherNumberRule: null,
            voucherPrefixNumber: '',
            voucherSerialNumberStart: null,
            voucherSerialNumberEnd: null,
            issuedLimit: null,
            isLaunched: null,
            trustMaturityDay: null,
            discountDateType: null,
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
            expiredDate: '',
            issueByOnline: null,
            issueByPaper: null,
            issueByApi: true,
            createTime: '',
            creator: '',
            updateTime: '',
            updator: '',
            voucherTermData: [],
            reimbursedUnitData: []
        });
        onMounted(async () => {
            const voucher_base_url = '/api/QueryVoucher';
            const voucher_type_init = {method: 'GET', accept: 'application/json', headers: {}};
            form.value = await fetch(`${voucher_base_url}?VoucherId=${voucherId}`, voucher_type_init)
                .then(response => response.json()).then(data => {
                    limitTemp.isLimit = data.value.issuedLimit == null ? '1' : '2';
                    data.value.expiredDate = moment(data.value.expiredDate).format('YYYY-MM-DD');
                    if (data.value.discountDateStart != null) data.value.discountDateStart = moment(data.value.discountDateStart).format('YYYY-MM-DD');
                    if (data.value.discountDateEnd != null) data.value.discountDateEnd = moment(data.value.discountDateEnd).format('YYYY-MM-DD');
                    return data.value
                });
        });
        const addTermTemp = reactive({
            content: ''
        });
        const limitTemp = reactive({
            isLimit: null
        });
        return {form, router, addTermTemp, limitTemp};
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
                document.getElementById("nextBtn").innerHTML = "完成修改";
                document.getElementById("nextBtn").addEventListener("click", this.updateVoucher)
            } else {
                document.getElementById("nextBtn").innerHTML = "下一步";
                document.getElementById("nextBtn").removeEventListener("click", this.updateVoucher)
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
        updateVoucher() {
            let voucherData = {
                voucherId: this.form.voucherId,
                issuerId: this.form.issuerId,
                voucherMainCategoryId: this.form.voucherMainCategoryId,
                voucherSubCategoryId: this.form.voucherSubCategoryId,
                voucherName: this.form.voucherName,
                voucherType: this.form.voucherType,
                voucherNumberRule: this.form.voucherNumberRule,
                voucherPrefixNumber: this.form.voucherPrefixNumber,
                voucherSerialNumberStart: this.form.voucherSerialNumberStart,
                voucherSerialNumberEnd: this.form.voucherNumberRule === 3 ? this.form.voucherSerialNumberEnd : null,
                issuedLimit: this.form.issuedLimit,
                isLaunched: this.form.isLaunched,
                trustMaturityDay: this.form.trustMaturityDay,
                discountDateType: this.form.discountDateType,
                afterIssueDate: this.form.discountDateType === 2 ? this.form.afterIssueDate : null,
                discountDateStart: this.form.discountDateType === 3 ? this.form.discountDateStart : null,
                discountDateEnd: this.form.discountDateType === 3 ? this.form.discountDateEnd : null,
                issuerName: this.form.issuerName,
                issuerHead: this.form.issuerHead,
                issuerUniformNo: this.form.issuerUniformNo,
                issuerAddress: this.form.issuerAddress,
                issuerCapital: this.form.issuerCapital,
                net: this.form.net,
                sellPrice: this.form.sellPrice,
                commission: this.form.commission,
                advertisingFee: this.form.advertisingFee,
                stickerPrice: this.form.stickerPrice,
                posdiscountPrice: this.form.posdiscountPrice,
                expiredDate: this.form.expiredDate,
                issueByOnline: this.form.issueByOnline,
                issueByPaper: this.form.issueByPaper,
                issueByApi: this.form.issueByApi,
                createTime: this.form.createTime,
                creator: this.form.creator,
                updateTime: this.form.updateTime,
                updator: this.form.updator,
                voucherTermsDtos: this.form.voucherTermData,
                reimbursedUnitsDtos: this.form.reimbursedUnitData
            };
            let url = '/api/UpdateVoucher';
            axios.post(url, voucherData).then((response) => {
                console.log(response.data)
            });
        },
        addTerm() {
            let termDto = {
                content: this.addTermTemp.content
            };
            this.form.voucherTermsDtos.push(termDto);
            this.clearTemp();
        },
        clearTemp() {
            this.addTermTemp.content = '';
        },
        removeStore(index) {
            this.form.voucherTermsDtos.splice(index, 1);
        },
        fetchData: function (dataState) {
            const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
            const base_url = '/api/QueryVoucherCategory';
            const init = {method: 'GET', accept: 'application/json', headers: {}};
            fetch(`${base_url}?${queryStr}`, init)
                .then(response => response.json()).then(data => {
                this.mainCategory = data;
                this.subCategory = data[this.form.voucherMainCategoryId - 1].voucherSubCategories;
            })
        },
        setSubCategoryDropdownlist(mainCategoryId) {
            document.getElementById("sub-category").value = 0;
            this.subCategory = [];
            this.form.voucherMainCategoryId = mainCategoryId;
            this.form.voucherSubCategoryId = 0;
            if (mainCategoryId !== 0) this.subCategory = this.mainCategory[mainCategoryId - 1].voucherSubCategories;
        },
        setSubCategoryId(subCategoryId) {
            this.form.voucherSubCategoryId = subCategoryId;
        },
        setIssuerId() {
            let url = `/api/QueryIssuerId?CompanyName=${this.form.issuerName}`;
            axios.get(url).then((response) => {
                this.form.issuerId = response.data.value.issuerId;
            });
        },
        branchClickEvent(n) {
            if (n == 1) {
                this.setIssuerId();
                this.setStores();
            } else if (n == 2) {
                this.setDefaultStores();
            }
        },
        setStores() {
            let url = `/api/QuerySupplierByIssuer?IssuerId=${this.form.issuerId}`;
            axios.get(url).then(response => {
                for (const storeData of response.data.value) {
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
                    for (const storeDatum of storeData.storeData) {
                        store['stores'].push({
                            displayName: `${storeData.businessName}-${storeDatum.supplierName}`,
                            supplierName: storeDatum.supplierName,
                            isMain: storeDatum.isMain,
                            supplierUniformNo: storeDatum.uniformNo,
                            storeNo: storeDatum.storeNo,
                            supplierId: storeDatum.supplierId
                        })
                    }
                    this.optionStoreData.push(store);
                }
            });
        },
        setDefaultStores() {
            const supplierIds = [];
            this.form.reimbursedUnitData.forEach(function (x) {
                supplierIds.push(x['supplierId']);
            })
            this.form.reimbursedUnitData = [];

            for (const storeData of JSON.parse(JSON.stringify(this.optionStoreData))) {
                for (const store of storeData.stores) {
                    if (supplierIds.includes(store.supplierId)) {
                        this.selectedStores.push(store);
                    }
                }
            }
        }
    },
    computed: {
        maturityDayInt: {
            get: function () {
                return this.form.trustMaturityDay;
            },
            set: function (newValue) {
                this.form.trustMaturityDay = parseInt(newValue);
            }
        },
        numberRuleInt: {
            get: function () {
                return this.form.voucherNumberRule;
            },
            set: function (newValue) {
                this.form.voucherNumberRule = parseInt(newValue);
            }
        },
        discountDateTypeInt: {
            get: function () {
                return this.form.discountDateType;
            },
            set: function (newValue) {
                this.form.discountDateType = parseInt(newValue);
            }
        }
    }
};
</script>

<style src="vue-multiselect/dist/dist/vue-multiselect.css"></style>