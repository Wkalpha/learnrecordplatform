<template>
    <div class="auth-page">
        <div class="container-fluid p-0">
            <div class="row g-0 align-items-center">
                <div class="col-xxl-12 col-lg-12 col-md-12">
                    <div class="row justify-content-center g-0">
                        <div class="col-xl-4">
                            <div class="p-4">
                                <div class="card mb-0">
                                    <div class="card-body">
                                        <div class="auth-full-page-content rounded d-flex p-3 my-2">
                                            <div class="w-100">
                                                <div class="d-flex flex-column h-100">
                                                    <div class="mb-4 mb-md-5">
                                                        <router-link to="/" class="d-block auth-logo">
                                                            <img src="@/assets/images/logo-dark.png" alt="" height="22"
                                                                class="auth-logo-dark me-start">
                                                            <img src="@/assets/images/logo-light.png" alt="" height="22"
                                                                class="auth-logo-light me-start">
                                                        </router-link>
                                                    </div>
                                                    <div class="auth-content my-auto">
                                                        <div class="text-center">
                                                            <h5 class="mb-0">Welcome Back !</h5>
                                                            <p class="text-muted mt-2">Sign in to continue to Cloudy
                                                                Ticket</p>
                                                        </div>

                                                        <!-- Nav tabs -->
                                                        <ul class="nav nav-tabs nav-tabs-custom nav-justified"
                                                            role="tablist">
                                                            <li class="nav-item">
                                                                <a class="nav-link active" data-bs-toggle="tab"
                                                                    href="#loginIssuer" role="tab">
                                                                    <span class="d-block d-sm-none"><i
                                                                            class="fas fa-home"></i></span>
                                                                    <span class="d-none d-sm-block">發行商登入</span>
                                                                </a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" data-bs-toggle="tab"
                                                                    href="#loginSupplier" role="tab">
                                                                    <span class="d-block d-sm-none"><i
                                                                            class="far fa-user"></i></span>
                                                                    <span class="d-none d-sm-block">供應商登入</span>
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <!-- Tab panes -->
                                                        <div class="tab-content p-3 text-muted">
                                                            <div class="tab-pane active" id="loginIssuer"
                                                                role="tabpanel">
                                                                <form class="mt-4 pt-2">
                                                                    <div
                                                                        class="form-floating form-floating-custom mb-4">
                                                                        <input type="text" class="form-control"
                                                                            id="input-username"
                                                                            placeholder="Enter User Name"
                                                                            v-model="issuerLoginForm.account">
                                                                        <label for="input-username">帳號</label>
                                                                        <div class="form-floating-icon">
                                                                            <eva-icon name="people-outline"></eva-icon>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="form-floating form-floating-custom mb-4 auth-pass-inputgroup">
                                                                        <input type="password" class="form-control pe-5"
                                                                            id="password-input"
                                                                            v-model="issuerLoginForm.password"
                                                                            placeholder="Enter Password">

                                                                        <button type="button"
                                                                            class="btn btn-link position-absolute h-100 end-0 top-0"
                                                                            id="password-addon">
                                                                            <i
                                                                                class="mdi mdi-eye-outline font-size-18 text-muted"></i>
                                                                        </button>
                                                                        <label for="password-input">密碼</label>
                                                                        <div class="form-floating-icon">
                                                                            <eva-icon name="lock-outline"></eva-icon>
                                                                        </div>
                                                                    </div>

                                                                    <div class="mb-3">
                                                                        <button
                                                                            class="btn btn-primary w-100 waves-effect waves-light"
                                                                            type="submit">發行商登入</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="tab-pane" id="loginSupplier" role="tabpanel">
                                                                <form class="mt-4 pt-2">
                                                                    <div
                                                                        class="form-floating form-floating-custom mb-4">
                                                                        <input type="text" class="form-control"
                                                                            id="input-username"
                                                                            v-model="supplierLoginForm.account"
                                                                            placeholder="Enter User Name">
                                                                        <label for="input-username">帳號</label>
                                                                        <div class="form-floating-icon">
                                                                            <eva-icon name="people-outline"></eva-icon>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="form-floating form-floating-custom mb-4 auth-pass-inputgroup">
                                                                        <input type="password" class="form-control pe-5"
                                                                            id="password-input"
                                                                            v-model="supplierLoginForm.password"
                                                                            placeholder="Enter Password">

                                                                        <button type="button"
                                                                            class="btn btn-link position-absolute h-100 end-0 top-0"
                                                                            id="password-addon">
                                                                            <i
                                                                                class="mdi mdi-eye-off-outline font-size-18 text-muted"></i>
                                                                        </button>
                                                                        <label for="password-input">密碼</label>
                                                                        <div class="form-floating-icon">
                                                                            <eva-icon name="lock-outline"></eva-icon>
                                                                        </div>
                                                                    </div>

                                                                    <div class="mb-3">
                                                                        <button
                                                                            class="btn btn-primary w-100 waves-effect waves-light"
                                                                            type="submit">供應商登入</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div class="mt-4 text-center">
                                                        <p class="mb-0">© {{ new Date().getFullYear() }} <i
                                                                class="mdi text-danger"></i> by 鎮穩</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end auth full page content -->
                </div>
            </div>
            <!-- end row -->
        </div>
        <!-- end container fluid -->
    </div>
</template>

<script>

import { reactive } from 'vue';

export default {
    setup() {

        const issuerLoginForm = reactive({
            account: '',
            password: ''
        });

        const supplierLoginForm = reactive({
            account: '',
            password: ''
        });

        return { issuerLoginForm, supplierLoginForm };
    }
}
</script>