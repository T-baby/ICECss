
//云服务SDK
function ice_cloud() {

    var ice = this;

    //云中心地址
    this.url = "http://cloud.besdlab.cn/";
    this.link = "";
    //初始化变量
    this.username = "null";
    this.password = "null";
    this.email = "null";
    this.num = 0;
    this.value1 = "null";
    this.value2 = "null";
    this.value3 = "null";
    this.value4 = "null";
    this.id = 0;

    //初始化用于存储结果的变量
    this.result = "null";


    //请将开发者ID填写在这
    this.devid = "null";


    //设置开发者ID
    this.setDevid = function(d) {
        ice.devid = d;
    };

    //调用api接口登录
    this.login = function(u, p) {
        ice.link = ice.url + "api/login";
        ice.username = u;
        ice.password = p;
        return ice.cloud_ajax();
    };

    //调用api接口注册
    this.register = function(u, p, e) {
        ice.link = ice.url + "api/register";
        ice.username = u;
        ice.password = p;
        ice.email = e;
        return ice.cloud_ajax();
    };

    //调用api接口退出登录
    this.logout = function() {
        ice.link = ice.url + "manage/account/logout";
        return ice.cloud_ajax();
    };

    //验证登录，如果已登录返回账户名和开发者ID
    this.loged = function() {
        ice.link = ice.url + "manage/account/loged";
        return ice.cloud_ajax();
    };

    //调用api向数据仓库增加数据
    this.storeAdd = function(v1, v2, v3, v4) {
        ice.link = ice.url + "api/store/add";
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //调用api删除数据仓库中指定ID的数据
    this.storeDelete = function(i) {
        ice.link = ice.url + "api/store/delete"
        ice.id = i;
        return ice.cloud_ajax();
    };

    //根据条件查找数据仓库
    this.storeSearch = function(n, v1, v2, v3, v4) {
        ice.link = ice.url + "api/store/search";
        ice.num = n;
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //调用api修改数据
    this.storeUp = function(id, v1, v2, v3, v4) {
        ice.link = ice.url + "api/store/up";
        ice.id = id;
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //开发者授权
    this.manageLogin = function(u, p) {
        ice.link = ice.url + "manage/login";
        ice.username = u;
        ice.password = p;
        return ice.cloud_ajax();
    };

    //增加public数据
    this.addPublic = function(v1, v2, v3, v4) {
        ice.link = ice.url + "api/store_public/addpublic";
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };
    //删除public数据
    this.delPublic = function(i) {
        ice.link = ice.url + "api/store_public/delpublic";
        ice.id = i;
        return ice.cloud_ajax();
    };

    //修改public数据
    this.upPublic = function(id, v1, v2, v3, v4) {
        ice.link = ice.url + "api/store_public/uppublic";
        ice.id = id;
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //获取public数据
    this.serPublic = function() {
        ice.link = ice.url + "api/store_public/serpublic";
        return ice.cloud_ajax();
    };

    //获取result
    this.getResult = function() {
        return ice.result;
    };


    //AJAX方法
    this.cloud_ajax = function() {
        $.ajax(ice.link, {

            type: "POST",

            xhrFields: {

                withCredentials: true,
                useDefaultXhrHeader: false

            },
            async: false,
            data: {
                id: ice.id,
                username: ice.username,
                password: ice.password,
                email: ice.email,
                devid: ice.devid,
                num: ice.num,
                value1: ice.value1,
                value2: ice.value2,
                value3: ice.value3,
                value4: ice.value4


            },

            crossDomain: true,

            success: function(data, status, xhr) {
                ice.result = data["result"];

            }

        });

    }




}
