//设计游戏类
class Game {
    constructor(select,scoreEle,gameoverimg) {
        this.startbtn=document.querySelector("#start");
        this.gameoverimg=document.querySelector(gameoverimg);
        //获取地图
        this.map = document.querySelector(select);
        //获取分数
        this.scoreEle = document.querySelector(scoreEle);
        //创建食物
        this.food = new Food(select);
        //创建蛇
        this.snake = new Snake(select);
        //定义计时器
        this.timer = null;
        //得分
        this.score = 0;
        // 初始时间间隔
        this.interval = 400;
        // 每次吃食物后减少的时间间隔
        this.intervalDecrease = 50;
        // 最小时间间隔
        this.minInterval = 100;
    }
    //开始游戏的方法
    startGame() {
        this.gameoverimg.style.display='none';
        const gameLoop = () => {
            //蛇的移动
            this.snake.moveSnake();  
            //蛇吃食物
            if(this.snake.eatFood(this.food.x,this.food.y)){
                this.snake.createHead();
                //食物的更新
                this.food.foodPos();
                //分数的更新
                this.score += 10;
                // 修正分数更新代码
                this.scoreEle.innerHTML = this.score;
                // 加快蛇的速度
                if (this.interval > this.minInterval) {
                    this.interval = Math.max(this.interval - this.intervalDecrease, this.minInterval);
                    clearInterval(this.timer);
                    this.timer = setInterval(gameLoop, this.interval);
                }
            } 
            //蛇死亡
            if(this.snake.isDie()){
                clearInterval(this.timer);
                this.gameOver();
            }
        };
        // 使用初始时间间隔启动定时器
        this.timer = setInterval(gameLoop, this.interval);
    }
    //暂停游戏的方法
    stopGame() {
        clearInterval(this.timer);
    }
    //游戏的重新开始
    restartGame() {
        window.location.reload();
    }
    //改变方向的方法
    changeDir(type) {
        this.snake.dir = type;
    }
    //游戏结束的方法
    gameOver() {
        this.gameoverimg.style.display='block';
        //禁用开始按钮的点击事件
        this.startbtn.disabled=true;
    }
}