// 页面加载完成后执行的代码
window.onload=function(){
    // 存储音频元素
    var audios = [];
    for (var i = 1; i <= 5; i++) {
        audios.push(document.getElementById('music0' + i));
    }

    //页面加载完成 1 秒后，调用 getpre
    setTimeout(getpre,1000);
    //每隔 3 秒调用一次 getpre 函数，实现自动轮播
    timer=setInterval(getpre,3000);
    //存储图片元素和指示点元素
    var pics=new Array();
    var dots=new Array();
    var banner=document.getElementById('banner');

    for(var i=1;i<=5;i++){
        //创建图片元素和对应的指示点元素
        var lbli=document.createElement('li');
        var lbimg=document.createElement('img');

        //根据循环变量 i 动态加载不同图片的路径和样式
        lbimg.src="../image/pics0"+i+".jpg";
        lbimg.style.width="750px"
        lbimg.style.height="421px"
        lbli.appendChild(lbimg);

        // 创建播放/暂停图标
        var playPauseBtn = document.createElement('i');
        playPauseBtn.classList.add('play-pause-btn', 'fas', 'fa-play');
        lbli.appendChild(playPauseBtn);

        banner.appendChild(lbli);
        pics.push(lbli);
        pics[pics.length-1].style.left="0px";

        //鼠标移入时停止自动轮播，移出时重新启动自动轮播
        lbimg.onmouseenter=function(){
            clearInterval(timer);
        }
        lbimg.onmouseleave=function(){
            timer=setInterval(getpre,3000);
        }    

        //创建指示点元素并添加到页面中
        var bottomdot=document.createElement("div");
        bottomdot.style.left=140*(i+1)+"px";
        bottomdot.name=i;
        dots.push(bottomdot);
        banner.appendChild(bottomdot);

        //为图片元素设置 id
        if(i>3){
            lbli.id=i-3;
        }else{
            lbli.id=i+2;
        }

        // 为图标添加点击事件，控制音乐播放和暂停
        (function (index, btn) {
            btn.onclick = function (event) {
            event.stopPropagation(); // 阻止事件冒泡
            clearInterval(timer); // 取消自动轮播
            if (audios[index].paused) {
                // 暂停其他音乐
                audios.forEach(function (audio) {
                    if (!audio.paused) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                });
                const playPromise = audios[index].play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // 播放成功
                        btn.classList.remove('fa-play');
                        btn.classList.add('fa-pause');
                    }).catch(error => {
                        // 播放失败
                        console.error('播放音乐失败:', error);
                        btn.classList.remove('fa-pause');
                        btn.classList.add('fa-play');
                    });
                }
            } else {
                audios[index].pause();
                audios[index].currentTime = 0;
                btn.classList.remove('fa-pause');
                btn.classList.add('fa-play');
            }
        };
        })(i - 1, playPauseBtn);
    }

    //为图片设置展示样式
    var len=pics.length-1;
        pics[len-2].style.left="0px";
        pics[len-2].style.opacity=0.5;
        pics[len-3].style.opacity=0;
        pics[len-4].style.opacity=0;
        pics[len-1].style.zIndex=100;
        pics[len-1].style.left="200px";
        pics[len-1].style.transform="scale(1.3)";
        pics[len-1].style.opacity=1;
        pics[len].style.left="400px";
        pics[len].style.opacity=0.5;


    //切换到下一张图片的函数
    function getnext(){
        var give_up=pics[len];
        pics.pop();
        // 将移除的元素添加到数组开头
        pics.unshift(give_up);
        // 遍历数组，重新设置每个图片元素的样式
        for(var i=0;i<pics.length;i++){
            pics[i].style.zIndex=i;
            pics[i].style.transform="scale(1)";
        }

        // 重新设置图片的位置和透明度
        pics[len-2].style.left="0px";
        pics[len-2].style.opacity=0.5;
        pics[len-3].style.opacity=0;
        pics[len-4].style.opacity=0;
        pics[len-1].style.zIndex=100;
        pics[len-1].style.left="200px";
        pics[len-1].style.transform="scale(1.3)";
        pics[len-1].style.opacity=1;
        pics[len].style.left="400px";
        pics[len].style.opacity=0.5;

        // 调用 dotmov 函数更新指示点的状态
        dotmov();
        // 暂停所有音乐并重置图标
        audios.forEach(function (audio, index) {
            audio.pause();
            audio.currentTime = 0;
            pics[index].querySelector('.play-pause-btn').classList.remove('fa-pause');
            pics[index].querySelector('.play-pause-btn').classList.add('fa-play');
        });
        // 为前一张图片和后一张图片添加点击事件，调用相应的函数
        pics[len-2].onclick=function(){
            getnext();
        }
        pics[len].onclick=function(){
            getpre();
        }
    }

    // 切换到上一张图片的函数
    function getpre(){
        // 获取数组的第一个元素
        var give_up=pics[0];
        // 将该元素添加到数组末尾
        pics.push(give_up);
        // 从数组开头移除第一个元素
        pics.shift();

        // 遍历图片数组，重置所有图片的层级和缩放比例
        for(var i=0;i<pics.length;i++){
            pics[i].style.zIndex=i;
            pics[i].style.transform="scale(1)";
        }
        pics[len-2].style.left="0px";
        pics[len-2].style.opacity=0.5;
        pics[len-3].style.opacity=0;
        pics[len-4].style.opacity=0;
        pics[len-1].style.zIndex=100;
        pics[len-1].style.left="200px";
        pics[len-1].style.transform="scale(1.3)";
        pics[len-1].style.opacity=1;
        pics[len].style.left="400px";
        pics[len].style.opacity=0.5;
        dotmov();
        // 暂停所有音乐并重置图标
        audios.forEach(function (audio, index) {
            audio.pause();
            audio.currentTime = 0;
            pics[index].querySelector('.play-pause-btn').classList.remove('fa-pause');
            pics[index].querySelector('.play-pause-btn').classList.add('fa-play');
        });
        pics[len-2].onclick=function(){
            getnext();
        }
        pics[len].onclick=function(){
            getpre();
        }
        
    }

    // 初始化第一个指示点的背景颜色
    dots[0].style.background="rgb(48, 72, 77)";
    // 根据当前显示的图片更新指示点的背景颜
    function dotmov(){
        for(var i=0;i<dots.length;i++){
            // 判断当前指示点对应的图片是否为当前显示的图片
            if(dots[i].name==pics[len-1].id){
                dots[i].style.background="rgb(48, 72, 77)";
            }else{
                dots[i].style.background="rgb(123, 168, 175)";
            }
        }
    }
}