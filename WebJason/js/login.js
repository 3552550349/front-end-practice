var back = document.getElementById('back');

//  根据鼠标位置动态改变背景位置
window.onmousemove = function(event) {
    var x = -event.clientX / 40;
    var y = -event.clientY / 30;
    back.style.backgroundPositionX = x + "px";
    back.style.backgroundPositionY = y + "px";
}

// 获取账号密码
var zh = document.getElementById('zh');
var mm = document.getElementById('mm');
// 处理登录表单的提交
function login() {
    if (zh.value === "" || mm.value === "") {
        // 若为空，弹出提示框告知用户(目前还不会其他方式)
        alert("账号或密码不能为空");
        return false;
    } 
    // 检查账号密码
    else if (zh.value !== "123" || mm.value !== "123456") {    
        alert("账号或密码错误(可以选择游客登录)");
        return false;
    }
    return true;
}

// 获取加载动画设置
var con = document.getElementById('con')
function loadoff() {
    con.style.display = "none";
}
function loadon() {
    con.style.display = "flex";
}
window.onload = function() {
    loadon();
    setTimeout(loadoff, 3000);
}