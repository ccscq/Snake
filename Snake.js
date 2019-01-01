(function(){
    var elements=[];
    //小蛇构造函数
    function Snake(width,height,direction){
        this.width=width||20;
        this.height=height||20;
        this.body=[
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"orange"},
            {x:1,y:2,color:"orange"}
        ];

        this.direction=direction||"right";
    }

    //为原型添加方法---小蛇初始化方法
    Snake.prototype.init=function(map) {
        //先删除之前的小蛇
        remove();

        //循环遍历穿件div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";

            div.style.backgroundColor = obj.color;
            elements.push(div);
        }
    };

    //为原型添加方法---小蛇动起来
    Snake.prototype.move=function(food,map){
        //改变小蛇的身体坐标位置
        var i=this.body.length-1;
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;

        }

        //判断方向----改变小蛇头的坐标位置
        switch(this.direction){
            case "right":
                this.body[0].x+=1;
                break;

            case "left":
                this.body[0].x-=1;
                break;

            case "top":
                this.body[0].y-=1;
                break;

            case "bottom":
                this.body[0].y+=1;
                break;

        }

        //判断有没有吃到到食物
        //小蛇头的坐标和食物的坐标一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;

        //判断小蛇头的坐标和食物的坐标是否相同
        if(headX==food.x && headY==food.y){
            //获取小蛇的最后的尾巴
            var last=this.body[this.body.length-1];

            //把最后的蛇尾右复制一个，重新加入到小蛇body中
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //重新初始化食物
            food.init(map);
        }
    };

    //删除小蛇的私有函数
    function remove(){
        var i=elements.length-1;
        for(;i>=0;i--){
            //先从当前子元素中找到该子元素呃父级元素，然后再删除这个子元素
            var ele=elements[i];

            //从map上删除这个子元素
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);

        }
    }

    window.Snake=Snake;


}());