//蛇对象
class Snake {
    constructor(select) {
        this.map = document.querySelector(select);  
        //蛇的移动方向
        this.dir = 'right';
        //蛇的数组
        this.snakelist = [];
        //调用创建蛇的函数
        this.createSnake();
    }
    //创建蛇头的函数
    createHead() {
        //获取数组当中的第0位找到蛇头
        const head = this.snakelist[0];

        //定义坐标
        const pos={x:0,y:0};

        if (head) {
            //如果有蛇头则创建新的蛇头放在原先蛇头的后面坐标上
            switch (this.dir) {
                case 'right':
                    pos.x = head.offsetLeft + 24;
                    pos.y = head.offsetTop;
                    break;
                case 'left':
                    pos.x = head.offsetLeft - 24;
                    pos.y = head.offsetTop;
                    break;
                case 'top':
                    pos.x = head.offsetLeft;
                    pos.y = head.offsetTop - 24;
                    break;
                case 'bottom':
                    pos.x = head.offsetLeft;    
                    pos.y = head.offsetTop + 24;
                    break;
                default:
                    break; 
            }
            //需要把原先的蛇头变成蛇身
            head.className = 'body';
        }
        
        //创建蛇头
        const div = document.createElement('div');
        div.className = 'head';
        //把蛇头存入数组
        this.snakelist.unshift(div);
        //给蛇头定义坐标
        div.style.left = pos.x + 'px';
        div.style.top = pos.y + 'px';
        //把蛇头添加到地图上
        this.map.appendChild(div);
    }
    //创建蛇的函数
    createSnake() {
        for(let i=0;i<4;i++){
            this.createHead();    
        }        
    }
    //蛇的移动
    moveSnake() {
        const body= this.snakelist.pop();
        body.remove();
        this.createHead();
    }
    //判断蛇头是否吃到食物
    eatFood(foodX,foodY) {
        const head=this.snakelist[0];
        const headX=head.offsetLeft;
        const headY=head.offsetTop;
        if(headX===foodX&&headY===foodY){
            return true;
        }
        return false;
    }
    //判断蛇头是否撞墙
    isDie() {
        //获取蛇头
        const head=this.snakelist[0];
        const headX=head.offsetLeft;
        const headY=head.offsetTop;
        // 判断是否撞墙
        if(headX<0||headX>=this.map.clientWidth||headY<0||headY>=this.map.clientHeight){
            return true;
        }
        // 判断是否碰到身体
        for (let i = 1; i < this.snakelist.length; i++) {
            const bodyPart = this.snakelist[i];
            if (headX === bodyPart.offsetLeft && headY === bodyPart.offsetTop) {
                return true;
            }
        }
        return false;
    }
}

