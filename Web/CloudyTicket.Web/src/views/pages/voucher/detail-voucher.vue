<template>
    <Layout :pagetitle="'票券詳細頁'">
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
                                    <p class="card-title-desc">Step1</p>
                                </div>
                                <div>
                                    <div class="row justify-content-center align-items-center">
                                        <div class="col-2">選擇類別</div>
                                        <div class="col-2">
                                            <label for="main-category" class="col-form-label">大類別</label>
                                        </div>
                                        <div class="col-3">
                                            <select id="main-category" class="form-select">
                                                <option selected>請選擇</option>
                                                <option>餐飲業</option>
                                                <option>旅館業</option>
                                                <option>美容業</option>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <label for="sub-category" class="col-form-label">小類別</label>
                                        </div>
                                        <div class="col-3">
                                            <select id="sub-category" class="form-select">
                                                <option selected>請選擇</option>
                                                <option>飲料</option>
                                                <option>住宿</option>
                                                <option>按摩</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-1 align-items-center">
                                        <div class="col-2 p-3">票券種類</div>
                                        <div class="col-md-8 align-items-center">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="typeRadios"
                                                       id="typeRadios1" value="V" v-model="form.voucherType">
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
                                    <div class="row mb-1 align-items-center">
                                        <label
                                            for="voucher-name"
                                            class="col-sm-2 col-form-label p-3"
                                        >票券名稱</label
                                        >
                                        <div class="col-sm-7">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="voucher-name"
                                                :value="form.voucherName"
                                            />
                                        </div>
                                    </div>
                                    <div class="row mb-1">
                                        <div class="col-2">
                                            <label
                                                for="voucher-term"
                                                class="col-form-label"
                                            >票券條文</label
                                            >
                                        </div>
                                        <div class="card col-10">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div>
                                                            <input type="text" class="form-control" id="term-content"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-primary waves-effect waves-light"
                                                            id="voucher-term"
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
                                                        <th scope="row" style="width: 5%">{{ index + 1 }}</th>
                                                        <td style="width: 75%"><input type="text" class="form-control"
                                                                                      disabled
                                                                                      :value="data.content"/></td>
                                                        <td style="width: 20%">
                                                            <div class="d-flex flex-wrap gap-2">
                                                                <button type="button" disabled
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
                                    <div class="row mb-1 align-items-center">
                                        <div class="col-2 p-3">優惠日期</div>
                                        <div class="col-md-8 align-items-center">
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="disDateRadios1">
                                                    <input class="form-check-input" type="radio" name="disDateRadios"
                                                           id="disDateRadios1" value="1"
                                                           v-model="discountDateTypeInt">
                                                    無優惠期
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="disDateRadios"
                                                       id="disDateRadios2" value="2" v-model="discountDateTypeInt">
                                                <label class="form-check-label" for="disDateRadios2">
                                                    發行日起算
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="disDateRadios"
                                                       id="disDateRadios3" value="3" v-model="discountDateTypeInt">
                                                <label class="form-check-label" for="disDateRadios3">
                                                    固定優惠期
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- wizard-tab -->

                            <div class="wizard-tab">
                                <div>
                                    <div class="text-center mb-4">
                                        <h5>發行單位</h5>
                                        <p class="card-title-desc">Step2</p>
                                    </div>
                                    <div>
                                        <div class="row mb-1 align-items-center">
                                            <label
                                                for="issuer-name"
                                                class="col-sm-2 col-form-label p-3"
                                            >發行商</label
                                            >
                                            <div class="col-sm-7">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="issuer-name"
                                                    :value="form.issuerName"
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-1 align-items-center">
                                            <label
                                                for="issuer-head"
                                                class="col-sm-2 col-form-label p-3"
                                            >負責人</label
                                            >
                                            <div class="col-sm-7">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="issuer-head"
                                                    :value="form.issuerHead"
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-1 align-items-center">
                                            <label
                                                for="issuer-uniformNo"
                                                class="col-sm-2 col-form-label p-3"
                                            >統一編號</label
                                            >
                                            <div class="col-sm-7">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="issuer-uniformNo"
                                                    :value="form.issuerUniformNo"
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-1 align-items-center">
                                            <label
                                                for="issuer-address"
                                                class="col-sm-2 col-form-label p-3"
                                            >地址</label
                                            >
                                            <div class="col-sm-7">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="issuer-address"
                                                    :value="form.issuerAddress"
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-1 align-items-center">
                                            <label
                                                for="issuer-capital"
                                                class="col-sm-2 col-form-label p-3"
                                            >資本額</label
                                            >
                                            <div class="col-sm-7">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="issuer-capital"
                                                    :value="form.issuerCapital"
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-1 align-items-center">
                                            <div class="col-2 p-3">信託存續天數</div>
                                            <div class="col-md-8 align-items-center">
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
                            </div>
                            <!-- wizard-tab -->

                            <div class="wizard-tab">
                                <div>
                                    <div class="text-center mb-4">
                                        <h5>票號規則</h5>
                                        <p class="card-title-desc">Step3</p>
                                    </div>
                                    <div>
                                        <div class="row">
                                            <label
                                                class="col-sm-2 col-form-label p-3"
                                            >票號規則</label
                                            >
                                            <div class="col-xl-9">
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
                                                        <div class="row mb-3 col-12">
                                                            <label
                                                                for="voucher-prefix-number1"
                                                                class="col-sm-1 col-form-label"
                                                            >前編碼</label
                                                            >
                                                            <div class="col-sm-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-prefix-number1"
                                                                    :value="form.voucherNumberRule === 1 ? form.voucherPrefixNumber : ''"
                                                                />
                                                            </div>
                                                            <label
                                                                for="voucher-serial-number-start1"
                                                                class="col-sm-1 col-form-label"
                                                            >後流水號</label
                                                            >
                                                            <div class="col-sm-3">
                                                                <div class="input-group">
                                                                    <div class="input-group-text">起</div>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="voucher-serial-number-start1"
                                                                        :value="form.voucherNumberRule === 1 ? form.voucherSerialNumberStart : ''"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-check">
                                                            <label class="form-check-label" for="limitRadios1">
                                                                <input class="form-check-input" type="radio"
                                                                       name="limitRadios"
                                                                       id="limitRadios1" checked>
                                                                無庫存上限
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <label class="form-check-label" for="limitRadios2">
                                                                <input class="form-check-input" type="radio"
                                                                       name="limitRadios"
                                                                       id="limitRadios2">
                                                                上限張數
                                                            </label>
                                                            <!--                                                            <div class="col-sm-2">-->
                                                            <!--                                                                <input-->
                                                            <!--                                                                    type="text"-->
                                                            <!--                                                                    class="form-control"-->
                                                            <!--                                                                    id="add-store"-->
                                                            <!--                                                                />-->
                                                            <!--                                                            </div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label
                                                class="col-sm-2 col-form-label p-3"
                                            ></label
                                            >
                                            <div class="col-xl-9">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="form-check form-check-inline">
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
                                                                <input class="form-control" type="file" id="formFile">
                                                            </div>
                                                            <div class="col-sm-3">
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-primary waves-effect waves-light"
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
                                            <label
                                                class="col-sm-2 col-form-label p-3"
                                            ></label
                                            >
                                            <div class="col-xl-9">
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
                                                        <div class="row mb-3 col-12">
                                                            <label
                                                                for="voucher-prefix-number2"
                                                                class="col-sm-1 col-form-label"
                                                            >前編碼</label
                                                            >
                                                            <div class="col-sm-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="voucher-prefix-number2"
                                                                    :value="form.voucherNumberRule === 3 ? form.voucherPrefixNumber : ''"
                                                                />
                                                            </div>
                                                            <label
                                                                for="voucher-serial-number-start1"
                                                                class="col-sm-1 col-form-label"
                                                            >後流水號</label
                                                            >
                                                            <div class="col-sm-3">
                                                                <div class="input-group">
                                                                    <div class="input-group-text">起</div>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="voucher-serial-number-start1"
                                                                        :value="form.voucherNumberRule === 3 ? form.voucherSerialNumberStart : ''"
                                                                    />
                                                                </div>
                                                                <div class="p-1"></div>
                                                                <div class="input-group">
                                                                    <div class="input-group-text">迄</div>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="voucher-serial-number-end"
                                                                        :value="form.voucherNumberRule === 3 ? form.voucherSerialNumberEnd : ''"
                                                                    />
                                                                </div>
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
                                        <p class="card-title-desc">Step4</p>
                                    </div>
                                    <div>
                                        <h5>票券形式</h5>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <div>
                                                    <div class="form-check mb-3 form-check-inline">
                                                        <input class="form-check-input" type="checkbox"
                                                               id="voucherFormCheck1" :value="form.issueByApi">
                                                        <label class="form-check-label" for="voucherFormCheck1">
                                                            API 取號
                                                        </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox"
                                                               id="voucherFormCheck2" :value="form.issueByOnline">
                                                        <label class="form-check-label" for="voucherFormCheck2">
                                                            電子票券
                                                        </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox"
                                                               id="voucherFormCheck3" :value="form.issueByPaper">
                                                        <label class="form-check-label" for="voucherFormCheck3">
                                                            紙本票券
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end row -->
                                    </div>
                                    <div>
                                        <h5>票券成本</h5>
                                        <div class="row mb-1">
                                            <div class="input-group mb-3 col-2">
                                                <label
                                                    for="net"
                                                    class="col-sm-2 col-form-label"
                                                >NET</label
                                                >
                                                <div class="col-sm-3">
                                                    <input type="number" class="form-control" :value="form.net">
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="net">元</span>
                                                </div>
                                                <div class="col-1"></div>
                                                <label
                                                    for="price"
                                                    class="col-sm-2 col-form-label"
                                                >售價</label
                                                >
                                                <div class="col-sm-3">
                                                    <input type="number" class="form-control"
                                                           :value="form.sellPrice">
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="price">元</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-1">
                                            <div class="input-group mb-3 col-2">
                                                <label
                                                    for="commission"
                                                    class="col-sm-2 col-form-label"
                                                >傭金</label
                                                >
                                                <div class="col-sm-3">
                                                    <input type="number" class="form-control"
                                                           :value="form.commission">
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="commission">%</span>
                                                </div>
                                                <div class="col-1"></div>
                                                <label
                                                    for="advertising-fee"
                                                    class="col-sm-2 col-form-label"
                                                >廣告費</label
                                                >
                                                <div class="col-sm-3">
                                                    <input type="number" class="form-control"
                                                           :value="form.advertisingFee">
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="advertising-fee">%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-1">
                                            <div class="input-group mb-3 col-2">
                                                <label
                                                    for="sticker-price"
                                                    class="col-sm-2 col-form-label"
                                                >牌價</label
                                                >
                                                <div class="col-sm-3">
                                                    <input type="number" class="form-control"
                                                           :value="form.stickerPrice">
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="sticker-price">元</span>
                                                </div>
                                                <div class="col-1"></div>
                                                <label
                                                    for="pos-discount-price"
                                                    class="col-sm-2 col-form-label"
                                                >POS抵用金額</label
                                                >
                                                <div class="col-sm-3">
                                                    <input type="number" class="form-control"
                                                           :value="form.posdiscountPrice">
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="pos-discount-price">元</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3 align-items-center">
                                            <label
                                                for="store-tax-number"
                                                class="col-sm-2 col-form-label"
                                            >核銷特店統編</label
                                            >
                                            <div class="col-sm-7">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="store-tax-number"
                                                />
                                            </div>
                                        </div>
                                        <div class="card">
                                            <!-- end card header -->
                                            <div class="card-body">
                                                <div class="mb-2">特店多分店核銷</div>
                                                <div class="col-sm-3">
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary waves-effect waves-light"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label for="example-date-input"
                                                   class="col-md-2 col-form-label">商品到期日</label>
                                            <div class="col-md-2">
                                                <input class="form-control" type="date"
                                                       id="example-date-input" v-model="form.expiredDate">
                                            </div>
                                        </div>
                                        <!-- end form -->
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
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

export default {
    data() {
        return {
            currentTab: 0
        };
    },
    components: {
        Layout,
    },
    mounted() {
        this.showTab(this.currentTab);
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const voucherId = route.params.voucherId;
        const form = ref({
            advertisingFee: 0,
            commission: 0,
            createTime: '',
            creator: '',
            denomination: 0,
            discountDateType: 0,
            discountDateEnd: '',
            discountDateStart: '',
            expiredDate: '',
            isLaunched: false,
            issuedLimit: 0,
            issuerAddress: '',
            issuerCapital: 0,
            issuerHead: '',
            issuerId: '',
            issuerName: '',
            issuerUniformNo: '',
            net: 0,
            posdiscountPrice: 0,
            sellPrice: 0,
            stickerPrice: 0,
            trustMaturityDay: 0,
            updateTime: '',
            updator: '',
            voucherId: voucherId,
            voucherMainCategoryId: 0,
            voucherName: '',
            voucherNumberRule: 0,
            voucherPrefixNumber: '',
            voucherSerialNumberEnd: null,
            voucherSerialNumberStart: '',
            voucherSubCategoryId: 0,
            voucherTermData: [],
            voucherType: '',
            issueByApi: false,
            issueByOnline: false,
            issueByPaper: false
        });
        onMounted(async () => {
            const voucher_base_url = '/api/QueryVoucher';
            const voucher_type_init = {method: 'GET', accept: 'application/json', headers: {}};
            form.value = await fetch(`${voucher_base_url}?VoucherId=` + `${voucherId}`, voucher_type_init)
                .then(response => response.json()).then(data => data.value);
        });
        return { form, router};
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
                document.getElementById("nextBtn").innerHTML = "返回列表";
                document.getElementById("nextBtn").addEventListener("click", this.redirect);
            } else {
                document.getElementById("nextBtn").innerHTML = "下一步";
                document.getElementById("nextBtn").removeEventListener("click", this.redirect);
            }
            //... and run a function that will display the correct step indicator:
            this.fixStepIndicator(n);
        },
        nextPrev(n) {
            // This function will figure out which tab to display
            var x = document.getElementsByClassName("wizard-tab");

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
        disableElements() {
            const tags = ["input", "button", "select"];
            tags.forEach(tag => {
                const nodes = document.getElementsByTagName(tag);
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].disabled = true;
                    nodes[i].tabIndex = -1;
                }
            })
            document.getElementById("prevBtn").disabled = false;
            document.getElementById("nextBtn").disabled = false;
        },
        redirect(){
            this.$router.push({ path: "/voucher/list-voucher" });
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
    },
    created() {
        this.$nextTick(() => {
            this.disableElements();
        })
    }
};
</script>