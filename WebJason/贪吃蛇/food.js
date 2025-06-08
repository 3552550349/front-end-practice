//food类的定义
//食物的操作
//1.坐标位置
//2.生成食物
//3.食物的更新
class Food{
    constructor(select){
        this.map=document.querySelector(select);
        //创建食物
        this.food=document.createElement('div');
        this.food.className='food';
        this.map.appendChild(this.food);
        //食物的坐标
        this.x=0;
        this.y=0;
        //调用生成食物的方法
        this.foodPos();
    }
   //随机坐标点
   foodPos(){
    //1.拿到地图范围
    const mapW=this.map.clientWidth/24;
    const mapH=this.map.clientHeight/24;
    //2.随机坐标
    let n1=Math.floor(Math.random()*mapW);
    let n2=Math.floor(Math.random()*mapH);   
    this.x=n1*24;
    this.y=n2*24;
    //3.赋值给食物
    this.food.style.left=this.x+'px';
    this.food.style.top=this.y+'px';
   }
}