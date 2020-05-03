<template>
    <div>
        <footer class="page-footer">
            <div class="text-left">
                <div class="row">
                    <div class="col-6">
                        <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Super Hero Team</h5>
                        <p>Test Task created by Vladimir Krugov. It works on VueJs and backend API on Laravel.</p>
                    </div>
                    <hr class="clearfix w-100 d-md-none"/>
                    <hr class="clearfix w-100 d-md-none"/>
                    <div class="col-2"></div>
                    <div class="col-2"></div>
                    <div class="col-2">
                        <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Contacts</h5>
                        <ul class="list-unstyled">
                            <li><a href="https://www.linkedin.com/in/vladimir-krugov/">linkedIn</a></li>
                            <li><span>Skype: vladimir_2916</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="text-center py-3">
                Vladimir Krugov. Test Task
            </div>
            <hr/>
            <div class="text-center">
                <h1>
                    Super Hero Team
                </h1>
            </div>
            <div class="footer-copyright text-center py-3">
                <div fluid>
                    &copy; 2020 Copyright: Vladimir Krugov
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .page-footer{
        margin-top: 50px;
        background-color: #2c3e50;
        color: #eff7fd;
    }
    .page-footer a {
        color: #d7f8ff;
    }
</style>