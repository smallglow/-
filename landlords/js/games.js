$(function(){
	let help = 0;
	let all_poker =[];
	let round = 0;
	let round2 = 0;
	let zero = 0;
	// let plyaer1 ={name:'小李',integral:1000, poker:[], role:0};
	// let plyaer2 ={name:'小何',integral:1000, poker:[], role:0};
	// let plyaer3 ={name:'小刘',integral:1000, poker:[], role:0};
	 let player =[
         {name:'小李',integral:1000, poker:[], role:0},
         {name:'小何',integral:1000, poker:[], role:0},
         {name:'小李',integral:1000, poker:[], role:0},
	 ];

	let game = {
		boss:null,		
		select_poker:{
			poker:[],		
			type:0,			
			max: 0 			
		},	
		desktop_poker:{
			poker:[],		
			type:0,			
			max: 0 			
		},	

	}


	//生成初始牌堆
	let poker_str = '';	
	for(let i=0; i<54; i++){
		poker_str += '<li class="back" style="top:-'+i+'px;"></li>';
	}
	$('.all_poker').append(poker_str);
     for(let i=1; i<=13; i++){
	  	for(let j=0; j<4; j++){
	  		all_poker.push({num:i, color:j});
	  	}
	  }
	  all_poker.push({num:14, color:0});
	  all_poker.push({num:14, color:1});
	  // console.log(all_poker);
	
	let click = 0;	 	
	$('.x_poker').click(function(){
		shuffle();
	})
	$('.f_poker').click(function(){
		deal();
	})


	function shuffle(){
		$('.x_poker').css({display:'none'});
		 for(let i=0; i<3; i++){
			all_poker.sort(function(x, y){
				return Math.random()-0.5;
			});
		}

		let video = '<video class="shuffle" width="110%"   autoplay="autoplay" src="./vadio/我的作品1.mp4"></video>'
				for(let i=0;i<54;i++){
				 $('.all_poker li').eq(i).css({transform:'translateY(200px)',transition:'linear 0.5s'});
				 setTimeout(function(){
				 	 $('.all_poker li').eq(i).css({transform:'translateY(200px) rotateZ('+i*7+'deg) translateX(500px) translateY(300px)  ',transition:'linear 2s'});
				
					setTimeout(function(){
						$('.all_poker li').eq(i).css({top :'0', transform:'translateY(200px) rotateZ('+i*100+'deg) translateX('+(100+i)+'px) translateZ(0px) ',transition:'linear 3s'});
						setTimeout(function(){
							$('.all_poker li').eq(i).css({transform:'translateY(200px) rotateZ('+i*100+'deg)   translateX('+i*20+'px) translateZ('+i*10+'px) ',transition:'linear 0.1s'});
							setTimeout(function(){
								$('.all_poker li').eq(i).css({top:(0-i)+'px', transform:'translateY(0px)' ,transition:'linear 1s'});
								setTimeout(function(){
									$('.f_poker').css({display:'block'});
								},1000);
								
							},1000);
						},3500);
					},3000);
				},500);
	
		}
		setTimeout(function(){
			$('.start').append(video);
			setTimeout(function(){
				$('.start').animate({opacity:'0'},1000);
				setTimeout(function(){
					$('.start').css({display:'none'});
					$('.shuffle').remove();
				},1000);
			},4500);
		},3000)
		click++;
	}

    //封装发牌函数
    function deal(num){
    	$('.f_poker').css({display:'none'});
    	num = num || 0;
    	let poker_html ='';
    	if(num < 17){
    		
    		//发牌给左边玩家
    		$('.all_poker li:last').animate({left:'-500px', top:'300px'}, 200);
			setTimeout(function(){
				player[0].poker.push(all_poker.pop());
				poker_html = makePoker(player[0].poker[player[0].poker.length-1]);
				// console.log(poker_html);
				$('.play_1').append(poker_html);
				$('.play_1 li:last').css({left:num*20+'px'});
				$('.play_1').css({left:-10*num+'px'});
				$('.all_poker li:last').remove();

			},22);
 
            //发牌给中间玩家
    		setTimeout(function(){
				$('.all_poker li:last').animate({ top:'600px'}, 200);
				setTimeout(function(){
					player[1].poker.push(all_poker.pop());	
					poker_html = makePoker(player[1].poker[player[1].poker.length-1]);
					// console.log(poker_html);
					$('.play_2').append(poker_html);
					$('.play_2 li:last').css({left:num*20+'px'});
					$('.play_2').css({left:-10*num+'px'});
					$('.all_poker li:last').remove();
				}, 21);
			}, 24);

    		// 发牌给右边玩家
    		setTimeout(function(){
				$('.all_poker li:last').animate({left:'500px', top:'300px'}, 200);
				setTimeout(function(){
					player[2].poker.push(all_poker.pop());
					poker_html = makePoker(player[2].poker[player[2].poker.length-1]);
					// console.log(poker_html);
					$('.play_3').append(poker_html);
					$('.play_3 li:last').css({left:num*20+'px'});
					$('.play_3').css({left:-10*num+'px'});
					$('.all_poker li:last').remove();
					deal(num+1);
				}, 21);
			}, 48);
    		click++;
		}else{
            setTimeout(function(){
             all_play_sort();
            },100);
    	}
    }
    function makePoker(poker_data){
    	let color_arr = [
             [-17,-225],
             [-17,-5],
             [-160,-5],
             [-160,-225]
    	];

    	let x,y;
    	if(poker_data.num < 14){
			x = color_arr[poker_data.color][0];
			y = color_arr[poker_data.color][1];
		}else {
			if(poker_data.color == 0){
				x = -160;
				y = -5;
			}else{
				x = -17;
				y = -5;
			}
		}
poker_html = '<li style="width: 125px; height: 175px; background: url(./images/'+poker_data.num+'.png) '+x+'px '+y+'px;" data-num="'+poker_data.num+'" data-color="'+poker_data.color+'"></li>';
		return poker_html;
	}

     // 排序数组
    function all_play_sort(){
    	pokerSort(player[0].poker);
    	pokerSort(player[1].poker);
    	pokerSort(player[2].poker);

    	let table ='<ul class="table"></ul>';

    	$('.mid').append(table);
        // 自动排序
    	$('.play_1 li').remove();
		for(let i=0; i<17; i++){
			$('.play_1').append('<li class="back"></li>');
			$('.play_1 li:last').css({left:20*i+'px'});
		}
        
		setTimeout(function(){
			$('.play_1 li').remove();
			for(let i=0; i<17; i++){
				poker_html = makePoker(player[0].poker[i]);
				// console.log(poker_html);
				$('.play_1').append(poker_html);
				$('.play_1 li:last').css({left:20*i+'px'});
			}
			getBoss();
		}, 500);

    	$('.play_2 li').remove();
		for(let i=0; i<17; i++){
			$('.play_2').append('<li class="back"></li>');
			$('.play_2 li:last').css({left:20*i+'px'});
		}
         // let poker_html = '';
		setTimeout(function(){
			$('.play_2 li').remove();
			for(let i=0; i<17; i++){
				poker_html = makePoker(player[1].poker[i]);
				// console.log(poker_html);
				$('.play_2').append(poker_html);
				$('.play_2 li:last').css({left:20*i+'px'});
			}
			
		}, 500);

		$('.play_3 li').remove();
		for(let i=0; i<17; i++){
			$('.play_3').append('<li class="back"></li>');
			$('.play_3 li:last').css({left:20*i+'px'});
		}

		setTimeout(function(){
			$('.play_3 li').remove();
			for(let i=0; i<17; i++){
				poker_html = makePoker(player[2].poker[i]);
				// console.log(poker_html);
				$('.play_3').append(poker_html);
				$('.play_3 li:last').css({left:20*i+'px'});
			}
			
		}, 500);
	}

    function pokerSort(poker_arr){
    	poker_arr.sort(function(x,y){
    		if(x.num != y.num){
    			return x.num - y.num;
    		}else{
    			return x.color - y.color;
    		}
    	});
    }


    //抢地主
  function getBoss(get_play, cancelNum){
		if(cancelNum === undefined){
			cancelNum = 0;
		}
		console.log(cancelNum);
		if(get_play === undefined){
			get_play = Math.floor(Math.random()*3)
		}

		// 把对应的玩家抢地主的按钮显示
		$('.play_btn').eq(get_play).css({'display':'block'});

		//开始倒计时
		
		overtimer(get_play);

		// 绑定抢地主事件
		$('.play_btn').eq(get_play).on('click', '.get', function(){

			$('.play_btn').css({'display':'none'});
			player[get_play].role = 1;
			$('.music').attr('src','./audio/叫地主.mp3');

			clearInterval(over);

			timer =	15;
			// 地主牌开牌动画
			
			poker_html = '';
			$('.all_poker li').remove();
			// 把最后三张牌的数据发给地主角色玩家
			for(let i=0; i<all_poker.length; i++){
				poker_html = makePoker(all_poker[i]);
				$('.all_poker').append(poker_html);
				$('.play').eq(get_play).append(poker_html);
				click =2;
				// 中间玩家放牌的方式
				if(get_play == 1){
					$('.play').eq(get_play).find('li:last').css({left:(17+i)*20+'px'});
				}else if(get_play == 0){	// 两边玩家放牌的方式
                    $('.play').eq(get_play).find('li:last').css({left:(13+i)*20+'px'});
				}
				player[get_play].poker.push(all_poker[i]);

			}


			$('.all_poker li').eq(0).animate({left:'0px'},500).animate({top:'-50px'},200);
			$('.all_poker li').eq(1).animate({left:'-150px'},500).animate({top:'-50px'},200);
			$('.all_poker li').eq(2).animate({left:'150px'},500).animate({top:'-50px'},200);

			// 地主玩家牌重新排序
			setTimeout(function(){
				$('.play').eq(get_play).find('li').remove();
				for(let i=0; i<20; i++){
					// 生成背面的牌组
					$('.play').eq(get_play).append('<li class="back"></li>');
					$('.play').eq(get_play).find('li:last').css({left:20*i+'px'});
					$('.play').eq(get_play).css({left:-10*i+'px'});
				}
				setTimeout(function(){
					// 地主牌数据重新排序
					pokerSort(player[get_play].poker);
					$('.play').eq(get_play).find('li').remove();
					let poker_html = '';
					for(let i=0; i<player[get_play].poker.length; i++){
						poker_html = makePoker(player[get_play].poker[i]);
						$('.play').eq(get_play).append(poker_html);
						$('.play').eq(get_play).find('li:last').css({left:20*i+'px'});
						$('.play').eq(get_play).css({left:-10*i+'px'});
					}

					// 开始出牌阶段
					playPoker(get_play, 0);

				},200);

			}, 500);

		});

		// 绑定不抢地主事件
		$('.play_btn').eq(get_play).on('click', '.cancel', function(){


			clearInterval(over);

			timer =	15;
			
			// alert('不抢地主');
			$('.music').attr('src','./audio/不叫.mp3');

			cancelNum++;
			// console.log(cancelNum);
			if(cancelNum == 3){
				$('.bgmusic').attr('src','none');
				$('.music').attr('src','./audio/lose.mp3');

				// alert('没有玩家抢地主，本局平局！');
				let nn = $('<h3 />');
				nn.css({'color':'#fff','position':'absolute',top:'50%',left:'45%'});
				$('body').append(nn);
				nn.html('没有玩家抢地主，本局平局！');
				setTimeout(function(){
						window.location.href = window.location.href;
					},4000);
			}

			$('.play_btn').css({'display':'none'});
			$('.play_btn').eq(get_play).find('.get').off('click');
			$('.play_btn').eq(get_play).find('.cancel').off('click');

			get_play = ++get_play > 2? 0: get_play;
			getBoss(get_play, cancelNum);
		});

           $('#sf').on('click', '.get', function(){
				if(player[get_play].role == 1){
					$('.sf').css({'display':'block','background':'url(./images/money.png)'});
				}
			});
			$('#sf1').on('click', '.get', function(){
				if(player[get_play].role == 1){
					$('.sf1').css({'display':'block','background':'url(./images/money.png)'});
				}
			});
			$('#sf2').on('click', '.get', function(){
				if(player[get_play].role == 1){
					$('.sf2').css({'display':'block','background':'url(./images/money.png)'});
				}
			});
				setTimeout(function(){
				if(player[get_play].role == 0){
					$('.sf').css({'display':'block','background':'url(./images/farmer.png)'});
					$('.sf1').css({'display':'block','background':'url(./images/farmer.png)'});
					$('.sf2').css({'display':'block','background':'url(./images/farmer.png)'});
				}
		},1000);
	}


	// 出牌阶段
	function playPoker(index, cancelNum){
		$('.play_btn2').css({'display':'none'});
		$('.play').off('click','li');               // 解绑选牌事件
		$('.play_btn2').off('click', '.play_out');  // 解绑出牌事件
		$('.play_btn2').off('click', '.pass');
		$('.play_btn2').off('click', '.tishi');       // 解绑过牌事件
		$('.play_btn2').eq(index).css({'display':'block'});

		$('.play_btn2').eq(index).find('.time').html("25");
		overtime2(index);



		if(game.desktop_poker.poker.length == 0){
				$('.pass').eq(index).attr("disabled",true);
			}else{
				$('.pass').eq(index).attr("disabled",false);
			}
		// 绑定选牌事件
		$('.play').eq(index).on('click', 'li', function(){
			let poker = {};
			//poker.num = $(this).attr('data-num');
			poker.num = $(this).attr('data-num');
			poker.color = $(this).attr('data-color');


			if($(this).attr('class') == 'select'){
				$(this).removeClass('select');
				delSelect(poker);
			}else{
				// 添加玩家选中的牌到牌组数据
				game.select_poker.poker.push(poker);
				// console.log(game.select_poker);
				$(this).addClass('select');
				console.log(game.select_poker.poker);
			}
		});


		function tishi3(max){
			let a=[];
			let b=[];
			for(let i=0;i<player[index].poker.length;i++){
				
				a.push(player[index].poker[i].num);
			}

			for(let i=0;i<a.length;i++){
				if(a[i]>max){
					b.push(i);
				}
			}
			return b;
         }

         
		//提示

		$('.play_btn2').eq(index).on('click', '.tishi', function(){
				tiShi(index);
				if(going==ture){
					alert('打不过上家！')
				}
				console.log(player[index].poker)
			});

	
	

		function tiShi(index){
			function tishiall(){
				for(let j = 0;j<help_length-3;j++){
					for(let i = 0; i<game.desktop_poker.poker.length ;i++){
						$('.play').eq(index).find('li').eq(j+i).trigger('click');
						}
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						for(let i = 0; i<game.desktop_poker.poker.length ;i++){
							$('.play').eq(index).find('li').eq(j+i).trigger('click');
							}
						}
					}
				for(let j = 0;j< help_length-1;j++){
					for(let i = 0; i<game.desktop_poker.poker.length;i++){
						$('.play').eq(index).find('li').eq(j+i).trigger('click');
						}
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							$('.play').eq(index).find('li').eq(j+i).trigger('click');
							}
						}
						
					}
			}
			let help_length = $('.play').eq(index).find('li').length;

			if(game.desktop_poker.poker.length == 0){
				$('.play').eq(index).find('li').eq(zero).trigger('click');
				zero= ++zero >help_length ? 0:zero;
			}
			if(game.desktop_poker.poker.length == 1){
				for(let j = 0;j< help_length;j++){
					$('.play').eq(index).find('li').eq(j).trigger('click');
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						$('.play').eq(index).find('li').eq(j).trigger('click');
					}				
				}
				tishiall();

			}
			if(game.desktop_poker.poker.length == 2){
				for(let j = 0;j< help_length-1;j++){
					for(let i = 0; i<game.desktop_poker.poker.length;i++){
						$('.play').eq(index).find('li').eq(j+i).trigger('click');
						}
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							$('.play').eq(index).find('li').eq(j+i).trigger('click');
							}
						}
						
					}
				
					tishiall();
					going=true;
				}

			if(game.desktop_poker.poker.length == 3){
				for(let j = 0;j< help_length-2;j++){
					for(let i = 0; i<game.desktop_poker.poker.length ;i++){
						$('.play').eq(index).find('li').eq(j+i).trigger('click');
						}
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						for(let i = 0; i<game.desktop_poker.poker.length ;i++){
							$('.play').eq(index).find('li').eq(j+i).trigger('click');
							}
						}
						
					}
					tishiall();
					going=true;

				}

			if(game.desktop_poker.poker.length == 4){
				for(let j = 0;j<help_length-3;j++){
					for(let i = 0; i<game.desktop_poker.poker.length ;i++){
						$('.play').eq(index).find('li').eq(j+i).trigger('click');
						}
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						for(let i = 0; i<game.desktop_poker.poker.length ;i++){
							$('.play').eq(index).find('li').eq(j+i).trigger('click');
							}
						}
					}
					tishiall();
					going=true;

				}

			if(game.desktop_poker.poker.length == 5){
				if(game.desktop_poker.type == 6){
					let p;
					let str=[];
					let newStr =[];
					let xiabiao=[];
					let j =1 ;
					let c =1 ;
					for(let i =0 ; i<player[index].poker.length;i++){
						str.push(player[index].poker[i].num)
					}
					//把数据传输到临时数组中
					for(let i = 0 ; i<str.length;i++){
						p = str.indexOf(str[i],c);
						if(p != -1){
							c++;
							newStr[i]="repick";
						} else{
							c++;
							newStr[i]=(str[i])*1;
						}
					}
					//将重复的数据分离
					for(let i = 0 ;i<newStr.length;i++){
						if(newStr[i] == 'repick'){
							 continue;
						}else{
							xiabiao.push(i);
						}
					}
					//取出不相同的数据的下标值
					//点击下标值数据的相应牌
					for(let j =0 ; j<help_length-4;j++){
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							console.log(xiabiao[i]);
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
						}
						checkPoker(game.select_poker);
						if(vsPoker()){
						break;
						}else{
						for(let i = 0 ; i<game.desktop_poker.poker.length ;i++){
							console.log('取消');
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
							}
						}
					}
				}
				//顺子选择完毕	
				if(game.desktop_poker.type == 5){
					let str=[];
					let newStr =[];
					let xiabiao=[];
					for(let i =0 ; i<player[index].poker.length;i++){
						str.push(player[index].poker[i].num)
					}
					for(let i = 0 ;i<str.length-2;i++){
						if(str[i]==str[i+2]){
							newStr.push(i);
							newStr.push(i+1);
							newStr.push(i+2);
						}
					}
					for(let i = 0;i<str.length;i++){
						for(let j = 0 ;j<str.length;j++){
							if(i==newStr[j]){
								i++
							}
						}
						xiabiao.push(i);
					}
				for(let j = 0;j< xiabiao.length-1;j++){
					for(let i = 0; i<game.desktop_poker.poker.length;i++){
						$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
						}
					checkPoker(game.select_poker);
					if(game.select_poker.type==2){
						break;
					}else{
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
							}
						}
						
					}
				//==================================================//
				for(let j=0;j<newStr.length;j=j+3){
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							console.log(xiabiao[i]);
							$('.play').eq(index).find('li').eq(newStr[j+i]).trigger('click');
						}
						checkPoker(game.select_poker);
						if(vsPoker()){
						break;
						}else{
						for(let i = 0 ; i<game.desktop_poker.poker.length ;i++){
							console.log('取消');
							$('.play').eq(index).find('li').eq(newStr[j+i]).trigger('click');
							}
						}
					}
				}
					tishiall();
					going=true;
			}
			if(game.desktop_poker.poker.length == 6){
				if(game.desktop_poker.type == 6){
					let p;
					let str=[];
					let newStr =[];
					let xiabiao=[];
					let j =1 ;
					let c =1 ;
					for(let i =0 ; i<player[index].poker.length;i++){
						str.push(player[index].poker[i].num)
					}
					//把数据传输到临时数组中
					for(let i = 0 ; i<str.length;i++){
						p = str.indexOf(str[i],c);
						if(p != -1){
							c++;
							newStr[i]="repick";
						} else{
							c++;
							newStr[i]=(str[i])*1;
						}
					}
					//将重复的数据分离
					for(let i = 0 ;i<newStr.length;i++){
						if(newStr[i] == 'repick'){
							 continue;
						}else{
							xiabiao.push(i);
						}
					}
					//取出不相同的数据的下标值
					//点击下标值数据的相应牌
					for(let j =0 ; j<help_length-5;j++){
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							console.log(xiabiao[i]);
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
						}
						checkPoker(game.select_poker);
						if(vsPoker()){
						break;
						}else{
						for(let i = 0 ; i<game.desktop_poker.poker.length ;i++){
							console.log('取消');
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
							}
						}
					}
				}
				tishiall();
				going=true;
			}
            if(game.desktop_poker.poker.length == 7){
				if(game.desktop_poker.type == 6){
					let p;
					let str=[];
					let newStr =[];
					let xiabiao=[];
					let j =1 ;
					let c =1 ;
					for(let i =0 ; i<player[index].poker.length;i++){
						str.push(player[index].poker[i].num)
					}
					//把数据传输到临时数组中
					for(let i = 0 ; i<str.length;i++){
						p = str.indexOf(str[i],c);
						if(p != -1){
							c++;
							newStr[i]="repick";
						} else{
							c++;
							newStr[i]=(str[i])*1;
						}
					}
					//将重复的数据分离
					for(let i = 0 ;i<newStr.length;i++){
						if(newStr[i] == 'repick'){
							 continue;
						}else{
							xiabiao.push(i);
						}
					}
					//取出不相同的数据的下标值
					//点击下标值数据的相应牌
					for(let j =0 ; j<help_length-6;j++){
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							console.log(xiabiao[i]);
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
						}
						checkPoker(game.select_poker);
						if(vsPoker()){
						break;
						}else{
						for(let i = 0 ; i<game.desktop_poker.poker.length ;i++){
							console.log('取消');
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
							}
						}
					}
				}
				tishiall();
				going=true;
			}

			if(game.desktop_poker.type ==8){
				let c =tishi3(game.desktop_poker.max-1);
				let p;
					let str=[];
					let newStr =[];
					let xiabiao=[];
					let j =1 ;
					let d =1 ;
					for(let i =0 ; i<player[index].poker.length;i++){
						str.push(player[index].poker[i].num)
					}
					//把数据传输到临时数组中
					for(let i = 0 ; i<str.length;i++){
						p = str.indexOf(str[i],d);
						if(p != -1){
							d++;
							newStr[i]="repick";
						} else{
							d++;
							newStr[i]=(str[i])*1;
						}
					}
					//将重复的数据分离
					let two =0;
					for(let i = 0 ;i<newStr.length;i++){
						if(newStr[i] == 'repick'){
							 if(two==0){
							 	xiabiao.push(i);
							 	two++;
							 }else{
							 	continue;
							 }
							 	
						}else{
							xiabiao.push(i);
							two=0;
						}
					}
					for(let j =0 ; j<help_length-5;j++){
						for(let i = 0; i<game.desktop_poker.poker.length;i++){
							console.log(xiabiao[i]);
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
						}
						checkPoker(game.select_poker);
						if(vsPoker()){
						break;
						}else{
						for(let i = 0 ; i<game.desktop_poker.poker.length ;i++){
							console.log('取消');
							$('.play').eq(index).find('li').eq(xiabiao[j+i]).trigger('click');
							}
						}
					}
					tishiall();
					going=true;
			}
			else{
				tishiall();
				going=true;
			}
				
		}


		// 绑定出牌事件
		$('.play_btn2').eq(index).on('click', '.play_out', function(){
			// alert('出牌');

			checkPoker(game.select_poker);
			if(game.select_poker.type == 0){
				alert('对不起，你出的牌不符合规则！');
			}else{
				if(vsPoker()){

					// clearInterval(playover);

					// timer =	25;
					if(player[index].role == 1){
						round++;
					}else{
						round2++;
					}

					round++;
					help = 0;


					clearInterval(playover);
				
					playtime =	25;

					animate();

					game.desktop_poker.type = game.select_poker.type;
					game.desktop_poker.max = game.select_poker.max;
					game.desktop_poker.poker = game.select_poker.poker;
					
					delPlayerPoker(index);

					game.select_poker.type=0;
					game.select_poker.max=0;
					game.select_poker.poker=[];

					
					$('.play').eq(index).find('li').remove();

					for(let i = 0;i<player[index].poker.length;i++){
						poker_html  = makePoker(player[index].poker[i]);
						$('.play').eq(index).append(poker_html);
						$('.play').eq(index).find('li:last').css({left:20*i+'px'});
						$('.play').eq(index).css({left:-10*i+'px'});
					}

					
					$('.table li').remove();
					for(let i =0 ;i<game.desktop_poker.poker.length;i++){
						

						poker_html  = makePoker(game.desktop_poker.poker[i]);


						$('.table').append(poker_html);

						
						$('.table').find('li:last').css({left:50*i+'px'});
						$('.table').css({left:-25*i+'px'});
					
						
					}
					

					


				if(player[index].poker.length == 0){
					let time ;
					$('.start').css({display:'block'}).animate({opacity:'1'});

						let animate_name = ['结束动画0','结束动画1'];
							animate_name.sort(function(x, y){
								return  Math.random()-0.5;
							});
						let end_animate = '<video class="shuffle" width="110%"   autoplay="autoplay" src="./vadio/'+animate_name[0]+'.mp4"></video>';
						$('.start').append(end_animate);
						if(animate_name[0]=='结束动画0'){
							time=27000;
						}else if(animate_name[0]=='结束动画1'){
							time=11000;
						}
						let flop = '<div class="side"> </div>';
						let positive = '<div class="positive"> </div>';
						setTimeout(function(){
							$('.shuffle').animate({opacity:'0'});
							$('.start').append(flop);
							setTimeout(function(){
								$('.side').css({transform:'rotateY(90deg)',transition:'linear 2s'});
								setTimeout(function(){
									$('.shuffle').remove();
									// $('.start').css({display:'none'});
									$('.start').append(positive)
									$('.positive').css({transform:'rotateY(360deg)'});
								},2000)
							},1000)
						},time)
						
						// setTimeout(function(){
						// 	$('start').append(flop).css({transform:'rotateY(90deg)',transition:'liner 1s'});
						// 	setTimeout(function(){
						// 		$('start').append(positive).css({transform:'rotateY(360deg)',transition:'liner 1s'});
						// 	},1000);
						// },time)
						
						// setTimeout(function(){
						// 	$('.shuffle').remove();
						// },)
						// alert('你赢了！');
						// $('.bgmusic').attr('src','none');

						// $('.music').attr('src','./audio/win.mp3');
						// let winer = $('<div />');
						// winer.css({'width':'600px','height':'400px', 'color':'#fff','position':'absolute',top:'25%',left:'35%','line-height':'400px','font-size':'30px','font-weight':'bold','text-align':'center',background:'url(./images/timg.gif) no-repeat'});
						// $('body').append(winer);
						// winer.html('你赢了！');
                   
                       if(round < 2 || round2 < 1){
						alert('春天');
						let Special = $('<div />');
						$(Special).css({width:'550px',height:'550px','position':'absolute',top:'20%',left:'25%'});
						$('body').append(Special);
		       		    setTimeout(function(){
		       			$(Special).css({'background':'url(./images/chuntian.png) no-repeat'});
						$(Special).animate({left:'45%'});
						setTimeout(function(){
							$(Special).css({'display':'none'});
						},6000);
					},10);
				}
						$('.bgmusic').attr('src','none');

						$('.music').attr('src','./audio/win.mp3');

						setTimeout(function(){
						// window.location.href = window.location.href;

					},6000);

				}else{
					index = ++index > 2? 0: index;
						playPoker(index, 0);
					}
				}else{
					alert('请按规则出牌...');
				}
			}
			
		});

		$('.play_btn2').eq(index).on('click', '.pass', function(){
			
			clearInterval(playover);
				
			playtime = 25;
			let pas = ['不要','pas','过','要不起'];
			pas.sort(function(x,y){
				return Math.random()-0.5;
			});
			$('.music').attr('src','./audio/'+pas[0]+'.mp3');

			$('.play').eq(index).find('li').remove();

				for(let i = 0;i<player[index].poker.length;i++){
					poker_html  = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({left:20*i+'px'});
					$('.play').eq(index).css({left:-10*i+'px'});
				}

			index = ++index > 2? 0: index;

			cancelNum++;


				game.select_poker.type=0;
				game.select_poker.max=0;
				game.select_poker.poker=[];

			if(cancelNum == 2){
				game.desktop_poker.type = 0;
				game.desktop_poker.max = 0;
				game.desktop_poker.poker = [];
				cancelNum = 0;

			}
			playPoker(index,cancelNum);
		});
	}
	// 删除选中牌组中的指定牌方法
	function delSelect(poker){
		let index = null;
		for(let i=0; i<game.select_poker.poker.length; i++){
			if(game.select_poker.poker[i].num == poker.num && game.select_poker.poker[i].color == poker.color){
				index = i;
				break;
			}
		}
		game.select_poker.poker.splice(index, 1);
	}

      // 玩家出牌成功后，删除对应玩家手牌数据
    function delPlayerPoker(index){
		let select_poker = game.select_poker.poker;
		let player_poker = player[index].poker;

		for(let i=0; i<select_poker.length; i++){
			for(let j=0; j<player_poker.length; j++){
				if(select_poker[i].num == player_poker[j].num && select_poker[i].color == player_poker[j].color){
					player_poker.splice(j, 1);
				}
			}
		}
	}


	function alertMsg(msg){
		let $bg = $('<div />');
		$bg.css({width:'100%', height:'100%', 'background':'#000','opacity':'0.5', 'position':'absolute'});
		let msg_div = '<div style="width:200px; height:200px; background:#ccc;">'+msg+'</div>';
		$bg.append(msg_div);
		$('body').append($bg);
	}
     
    /** 检查牌型的方法

    牌型代号：
    0：无效
    1：单张
    2：对子
    3：三张
    4：三带一
    5：三带二
    7：四带二
    6：顺子
    8：连对
    9: 飞机
    10: 四带对
    911：普通炸弹
    110：王炸
    */ 

	function checkPoker(poker_data){
		//初始化牌型与判断值
		poker_data.type = 0;
		poker_data.max = 0;
		//排序
		pokerSort(poker_data.poker);

		let poker = poker_data.poker;

		
			// 2、通过牌的张数来行各牌的判断
		switch(poker.length){
			// 判断1张牌的情况
	    case 1:
				poker_data.type = 1;		// 设置牌型为单张

				// 判断普通单张的判断值
				if(poker[0].num < 14){
					poker_data.max = poker[0].num;
				}else{
					// 判断大小王
					if(poker[0].color == 0){
						poker_data.max = 14;	// 小王的判断值
					}else{
						poker_data.max = 15;	// 大王的判断值
					}
				}
				console.log(poker_data.type);
				console.log(poker_data.max);
			break;
			// 判断两张牌的情况
	    case 2:
				// 判断两张牌的点数是否一样
				
				if(poker[0].num == poker[1].num){
					// 是否是普通对子还是王炸
					if(poker[0].num < 14){
						poker_data.type = 2;		// 设置牌型为对子
						poker_data.max = poker[0].num;
					}else{
						poker_data.type = 110;		// 设置牌型为王炸
						poker_data.max = poker[0].num;
					}

				}
			break;
			// 判断三张牌的情况
		case 3:
				// 判断三张牌的点数是否相等
				if(poker[0].num == poker[2].num){
					poker_data.type = 3;		// 设置牌型为三张
					poker_data.max = poker[0].num;	// 判断值
				}
			break;
			// 判断四张牌的情况
		case 4:
				// 判断四张牌的点数是否相等
				if(poker[0].num == poker[3].num){
					poker_data.type = 911;		// 设置牌型为普通炸弹
					poker_data.max = poker[0].num;	// 判断值
				}else if(poker[0].num == poker[2].num || poker[1].num == poker[3].num ){
					poker_data.type = 4;		// 设置牌型为三带一
					poker_data.max = poker[1].num;	// 判断值
				}
			break;
			// 判断五张牌的情况
		case 5:
				// 判断三带二
				if(poker[0].num == poker[2].num && poker[3].num == poker[4].num || poker[0].num == poker[1].num && poker[2].num == poker[4].num){
					poker_data.type = 5;		// 设置牌型为三带二
					poker_data.max = poker[2].num;	// 判断值
				}else if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;
			// 判断六张牌的情况
		case 6:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(poker[0].num == poker[3].num && poker[4].num == poker[5].num){
					poker_data.type = 10;		// 设置牌型四带对
					poker_data.max = poker[3].num;
				}else if(poker[2].num == poker[5].num && poker[0].num == poker[1].num){		// 判断四带对
					poker_data.type = 10;		// 设置牌型四带对
					poker_data.max = poker[5].num;
			    }else if(poker[0].num == poker[3].num || poker[1].num == poker[4].num || poker[2].num == poker[5].num){		// 判断四带二
					poker_data.type = 7;		// 设置牌型四带二
					poker_data.max = poker[3].num;	// 判断值
				}
			break;

			// 判断七张牌的情况
		case 7:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			// 判断八张牌的情况
		case 8:
				if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}else if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
			    }else if(poker[0].num == poker[3].num && poker[4].num == poker[5].num && poker[6].num == poker[7].num ){
					poker_data.type = 10;    
					poker_data.max = poker[3].num;
			    }else if(poker[2].num == poker[5].num && poker[6].num == poker[7].num && poker[0].num == poker[1].num ){
                    poker_data.type = 10;    
					poker_data.max = poker[5].num;
			    }else if(poker[4].num == poker[7].num && poker[0].num == poker[1].num && poker[2].num == poker[3].num ){			   	      
			   	    poker_data.type = 10;    
					poker_data.max = poker[7].num; 
			    }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && (poker[2].num*1)+1 == poker[3].num ){
					poker_data.type = 9;    
					poker_data.max = poker[5].num;
			    }else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && (poker[3].num*1)+1 == poker[4].num){
                                        poker_data.type = 9;    
					poker_data.max = poker[6].num;
			    }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && (poker[4].num*1)+1 == poker[5].num){			   	      
			   	    poker_data.type = 9;    
					poker_data.max = poker[7].num;
           }
			break;

		case 9:
				if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}
			break;

        case 10:
				if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;						
			    }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && 
			    	     poker[6].num == poker[7].num && poker[8].num == poker[9].num  && (poker[2].num*1)+1 == poker[3].num){	   			 			   	    
			   	    poker_data.type = 9;    
					poker_data.max = poker[5].num; 
			    }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && 
			    	     poker[0].num == poker[1].num && poker[8].num == poker[9].num  && (poker[4].num*1)+1 == poker[5].num){			   	       
	                poker_data.type = 9;    
					poker_data.max = poker[7].num; 
                }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && 
                	     poker[0].num == poker[1].num && poker[2].num == poker[3].num  && (poker[6].num*1)+1 == poker[7].num){ 	   	        
			   	    poker_data.type = 9;    
					poker_data.max = poker[9].num;
                 }else if(checkStraightPairs(poker)){		
					poker_data.type = 8;
					poker_data.max = poker[poker.length-1].num;	
				}
            break;

        case 11:
				if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}
			break;

		case 12:
		      if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}else if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
			   }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
			   	       (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num){
                    poker_data.type = 9;    
					poker_data.max = poker[8].num;
			   }else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num &&
			   	       (poker[3].num*1)+1 == poker[4].num && (poker[6].num*1)+1 == poker[7].num){
                    poker_data.type = 9;    
					poker_data.max = poker[9].num;
			   }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num &&
			   	       (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num){
                    poker_data.type = 9;    
					poker_data.max = poker[10].num;
			   }else if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num &&
			   	       (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num){        			   	  
			   	    poker_data.type = 9;    
					poker_data.max = poker[11].num;
           }
			break;

	    case 14:
               if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
               }
                break;

	    case 15:
		        if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
		         	poker[9].num == poker[10].num  && poker[11].num == poker[12].num && poker[13].num == poker[14].num &&
			   	   (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num){			   	       
                    poker_data.type = 9;    
					poker_data.max = poker[8].num; 
			   }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num &&
			   	        poker[0].num == poker[1].num  && poker[11].num == poker[12].num && poker[13].num == poker[14].num &&
			   	       (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num){
			   	    poker_data.type = 9;    
					poker_data.max = poker[10].num;
			   }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num &&
			   	        poker[0].num == poker[1].num  && poker[2].num == poker[3].num && poker[13].num == poker[14].num &&
			   	       (poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num){	   	       
			   	    poker_data.type = 9;    
					poker_data.max = poker[12].num; 
			   }else if(poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
			   	        poker[0].num == poker[1].num  && poker[2].num == poker[3].num && poker[4].num == poker[5].num &&
			   	       (poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 == poker[12].num){ 
			   	        
		   	        poker_data.type = 9;    
					poker_data.max = poker[14].num; 
           }
			break;

		case 16:
			    if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
               }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
			   	       (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num){
                    poker_data.type = 9;    
					poker_data.max = poker[11].num;
			   }else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && 
			   	       (poker[3].num*1)+1 == poker[4].num && (poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num){
                    poker_data.type = 9;    
					poker_data.max = poker[12].num;
			   }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num &&
			   	       (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num && (poker[10].num*1)+1 == poker[11].num){
                    poker_data.type = 9;    
					poker_data.max = poker[13].num;
			   }else if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
			   	       (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 == poker[12].num){
			   	    poker_data.type = 9;    
					poker_data.max = poker[14].num;
			   }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
			   	       (poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num && (poker[12].num*1)+1 == poker[13].num){        			   	  
			   	    poker_data.type = 9;    
					poker_data.max = poker[15].num;
           }
			break;

	    case 18:
               if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
               }
                break;

        case 20:
               if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
               }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
               	        poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
			   	       (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num && 
			   	       (poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 ==poker[12]){
                    poker_data.type = 9;    
					poker_data.max = poker[14].num;
			   }else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && 
			   	        poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
			   	       (poker[3].num*1)+1 == poker[4].num && (poker[6].num*1)+1 == poker[7].num && 
			   	       (poker[9].num*1)+1 == poker[10].num && (poker[12].num*1)+1 ==poker[13].num){
                    poker_data.type = 9;    
					poker_data.max = poker[15].num;
			   }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && 
			   	        poker[11].num == poker[13].num && poker[14].num == poker[16].num &&
			   	       (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num && 
			   	       (poker[10].num*1)+1 == poker[11].num && (poker[13].num*1)+1 ==poker[14].num){
                    poker_data.type = 9;    
					poker_data.max = poker[16].num;
			   }else if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
			   	        poker[12].num == poker[14].num && poker[15].num == poker[17].num &&
			   	       (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && 
			   	       (poker[11].num*1)+1 == poker[12].num && (poker[14].num*1)+1 ==poker[15].num){
			   	    poker_data.type = 9;    
					poker_data.max = poker[17].num;
			   }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && 
			   	        poker[13].num == poker[15].num && poker[16].num == poker[18].num &&
			   	       (poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num && 
			   	       (poker[12].num*1)+1 == poker[13].num && (poker[15].num*1)+1 ==poker[16].num){        			   	  
			   	    poker_data.type = 9;    
					poker_data.max = poker[18].num;
              }else if(poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num && 
			   	       poker[14].num == poker[16].num && poker[17].num == poker[19].num &&
			   	      (poker[7].num*1)+1 == poker[8].num && (poker[10].num*1)+1 == poker[11].num && 
			   	      (poker[13].num*1)+1 == poker[14].num && (poker[16].num*1)+1 ==poker[17].num){        			   	  
			   	    poker_data.type = 9;    
					poker_data.max = poker[19].num;


              }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
			   	       poker[12].num == poker[13].num && poker[14].num == poker[15].num && poker[16].num == poker[17].num && poker[18].num ==poker[19].num &&
			   	      (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num){ 
			   	       
                    poker_data.type = 9;    
					poker_data.max = poker[11].num;
			   }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num && 
			   	        poker[0].num == poker[1].num && poker[14].num == poker[15].num && poker[16].num == poker[17].num && poker[18].num ==poker[19].num &&
			   	       (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num && (poker[10].num*1)+1 == poker[11].num ){ 
			   	       
                    poker_data.type = 9;    
					poker_data.max = poker[13].num;
			   }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
			   	       poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[16].num == poker[17].num && poker[18].num ==poker[19].num &&
			   	       (poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num && (poker[12].num*1)+1 == poker[13].num ){	      
                    poker_data.type = 9;    
					poker_data.max = poker[15].num;
			   }else if(poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num && poker[15].num == poker[17].num &&
			   	        poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[5].num && poker[18].num ==poker[19].num &&
			   	       (poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 == poker[12].num && (poker[14].num*1)+1 == poker[15].num
			   	       ){
			   	    poker_data.type = 9;    
					poker_data.max = poker[17].num;
			   }else if(poker[8].num == poker[10].num && poker[11].num == poker[13].num && poker[14].num == poker[16].num && poker[17].num == poker[19].num &&
			   	       poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[5].num && poker[6].num ==poker[7].num &&
			           (poker[10].num*1)+1 == poker[11].num && (poker[13].num*1)+1 == poker[14].num && (poker[16].num*1)+1 == poker[17].num 
			   	       ){        			   	  
			   	    poker_data.type = 9;    
					poker_data.max = poker[19].num;
           }
           break;

       }
   }
        

           // 判断牌型是否为顺子
    function checkStraight(poker){
			for(let i=0; i<poker.length-1; i++){
				if((poker[i].num*1) + 1 != poker[i+1].num || (poker[poker.length-1].num)*1 > 12){
					return false;
				}
			}
			return true;

		}

           // 检查牌型是否为连对
    function checkStraightPairs(poker){
          	// 334455
			for(let i=0; i<poker.length-3; i+=2){
				if( poker[i].num*1 + 1 != poker[i+3].num || 
					poker[i+1].num*1 + 1 != poker[i+2].num || (poker[poker.length-1].num)*1 > 12){
					return false;
				}
				return true;
			};
		}


         // 用于对比选中的牌型与桌面牌型
    function vsPoker(){
         	if(game.desktop_poker.poker.length == 0){
         		return true;
         	}

         	if(game.select_poker.type == 110){
				return true;
			}

         	if(game.desktop_poker.type == 110){
				return false;
			}

         	if(game.select_poker.type == 911 && game.desktop_poker.type != 911){
				return true;	
			}

			//
         	if(game.select_poker.type == game.desktop_poker.type && 
			   game.desktop_poker.poker.length == game.select_poker.poker.length &&
			   game.select_poker.max *1 > game.desktop_poker.max *1
				){
				return true;
			}
			return false;
		}


	//定时器
	let timer =	15;
	function overtimer(index){
		over = setInterval(function(){
			timer=timer-1;
			$(".play_btn").eq(index).find('.time').html(timer);
			if(timer==0){
				clearInterval(over);
				$(".play_btn").eq(index).find('.cancel').trigger('click');
				timer =	15;
				return;
			}
		},1000)
	}  

	let playtime = 25;

	function overtime2(index){
		playover = setInterval(function(){
			playtime=playtime-1;
			$(".play_btn2").eq(index).find('.time').html(playtime);

			if(playtime==0){

				$(".play_btn2").eq(index).find('.pass').trigger('click');


				return;
			}
		},1000)
	}


	

		//出牌动画
       function animate(){
       	let Special = $('<div />');
		Special.css({width:'230px',height:'120px','position':'absolute',top:'50%',left:'45%'});
		$('body').append(Special);
		music();
       	if(game.select_poker.type == 3){
       		setTimeout(function(){
       			Special.css({'background':'url(./images/sanz.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		else if(game.select_poker.type == 4){
       		setTimeout(function(){
				$(Special).animate({left:'45%'});
       			Special.css({'background':'url(./images/s.png) no-repeat'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		else if(game.select_poker.type == 5){
       		setTimeout(function(){
       			Special.css({'background':'url(./images/icon.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		else if(game.select_poker.type == 6){
       		setTimeout(function(){
       			Special.css({'background':'url(./images/shunzi.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		else if(game.select_poker.type == 7){
       		setTimeout(function(){
       			Special.css({'background':'url(./images/sider.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		else if(game.select_poker.type == 8){
       		setTimeout(function(){
       			Special.css({'background':'url(./images/liandui.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

	    else if(game.select_poker.type == 9){
			 aircraft();
       		setTimeout(function(){
       			Special.css({'background':'url(./images/feiji.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		

		else if(game.select_poker.type == 911){
				 bomb();
       		setTimeout(function(){
       			Special.css({'background':'url(./images/boom.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

		else if(game.select_poker.type == 110){
				rocket();
			
		}

		else if(game.select_poker.type == 10){
       		setTimeout(function(){
       			Special.css({'background':'url(./images/four.png) no-repeat'});
				$(Special).animate({left:'45%'});
				setTimeout(function(){
					Special.css({'display':'none'});
				},1500);
			},10);
		}

    }


    //出牌音效
    function music(){
    	if(game.select_poker.type == 1){
    		for(let i=1;i<=15;i++){
    			if(game.select_poker.max==i)
    				$('.music').attr('src','./audio/'+i+'.mp3');
    			}
    	}
    	else if(game.select_poker.type == 2){
    		for(let i=1;i<=13;i++){
    			if(game.select_poker.max==i)
    				$('.music').attr('src','./audio/对'+i+'.mp3');
    			}
    	}
    	else if(game.select_poker.type == 4){
    		$('.music').attr('src','./audio/31.mp3');
    	}
    	else if(game.select_poker.type == 5){
    		$('.music').attr('src','./audio/32.mp3');
    	}
		else if(game.select_poker.type == 6){
			$('.music').attr('src','./audio/straight.mp3');
		}
		else if(game.select_poker.type == 7){
			$('.music').attr('src','./audio/42.mp3');
		}
		else if(game.select_poker.type == 8){
			$('.music').attr('src','./audio/pairs.mp3');
		}
		else if(game.select_poker.type == 9){
			$('.music').attr('src','./audio/air.mp3');
		}
		else if(game.select_poker.type == 10){
			$('.music').attr('src','./audio/四带两队.mp3');
		}
		else if(game.select_poker.type == 911){
			
			$('.music').attr('src','./audio/boom.mp3');
		}
		else if(game.select_poker.type == 110){
			
			$('.music').attr('src','./audio/king.mp3');
		}
    }

    function aircraft(){
		let video = '<video class="shuffle" style="opacity: 0;" width="110%"  autoplay="autoplay" src="./vadio/飞机.mp4"></video>';
		setTimeout(function(){
			$('.start').css({display:'block',opacity:'1'});
			$('.start').append(video);
			$('.shuffle').animate({opacity:'1'},500);
			setTimeout(function(){
				$('.shuffle').animate({opacity:'0'},500);
				setTimeout(function(){
					$('.start').css({display:'none'});
					// $('.shuffle').remove();
				},500);
				
			},6000);
		},500);
	}
	// rocket();
	function rocket(){
		let video = '<video class="shuffle"  style="opacity: 0;" width="110%"  autoplay="autoplay" src="./vadio/火箭.mp4"></video>';
		setTimeout(function(){
			$('.start').css({display:'block',opacity:'1'});
			$('.start').append(video);
			$('.shuffle').animate({opacity:'1'},500);
			setTimeout(function(){
				$('.shuffle').animate({opacity:'0'},500);
				setTimeout(function(){
					$('.start').css({display:'none'});
					// $('.shuffle').remove();
				},500);
			},6000);
		},500);
	}
	// bomb();
	function bomb(){
		let video = '<video class="shuffle"  style="opacity: 0;" width="110%"  autoplay="autoplay" src="./vadio/炸弹1.mp4"></video>';
		setTimeout(function(){
			$('.start').css({display:'block',opacity:'1'});
			$('.start').append(video);
			$('.shuffle').animate({opacity:'1'},500);
			setTimeout(function(){
				$('.shuffle').animate({opacity:'0'},500);
				setTimeout(function(){
					$('.start').css({display:'none'});
					// $('.shuffle').remove();
				},500);
			},5500);
		},500);
	}

});