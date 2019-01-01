(function(){
    var that=null;//该变量的目的就是为了保存游戏Game的实例对象

    //游戏的构造函数
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;
    }

    //初始化游戏----可以设置小蛇和事物显示出来
    Game.prototype.init=function(){
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map);
        this.bindKey();
    }

    //添加原型方法---设置小蛇可以自动跑起来
    Game.prototype.runSnake=function (food,map) {
        //自动移动
        var timeId=setInterval(function(){
            //此时this是window
            this.snake.move(food,map);

            //初始化小蛇
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offetHeight/this.snake.height;

            //小蛇头的坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;

            //横坐标
            if(headX<0||headX>=maxX){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }

            //纵坐标
            if(headY<0||headY>=maxY){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }


        }.bind(that),500);
    };

    //添加原型方法---设置用户按键，改变小蛇移动的方向
    Game.prototype.bindKey=function(){
        //获取用户按键，改变小蛇方向
        document.addEventListener("keydown",function(e){
            //这里的this应该是触发keydown的事件对象

            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false);
    };

    window.Game=Game;

}());