$(function(){
	start();
	function start(){

		$('body').on(' mouseenter','.logo',function(){
			$('.logo_left').animate({left:'20%',opacity:'0'},1000);
			$('.logo_right').animate({left:'80%',opacity:'0'},1000);
			$('.start_btn').animate({opacity:'1'},1000);
			// e.preventDefault();
			console.log(1)
			
		})
	
		$('body').on('mouseleave','.logo',function(){
			$('.logo_left').animate({left:'50%',opacity:'1'},1000);
			$('.logo_right').animate({left:'50%',opacity:'1'},1000);
			$('.start_btn').animate({opacity:'0'},1000);
			// e.preventDefault();
			console.log(2);
			// return false;
		})
	
			
		$('.start_btn').click(function(){
			let bg_ms = '<audio id="bgmusic"  loop="loop" autoplay  volume="0.6"><source src="./audio/风一样的勇士.mp3"/>您的浏览器垃圾，不支持播放</audio>';
			let worldofwar = document.getElementsByClassName('worldofwar')[0];
			worldofwar.pause();
			$('.logo').animate({opacity:'0'},1000);
			$('.worldofwar').animate({'opacity':'0'},1000).removeAttr('loop');
			setTimeout(function(){
				$('.s_right').animate({right:'-1000px','opacity':'0'},2000).prev().animate({left:'-1000px','opacity':'0'},2000);
				$('.logo').css({display:'none'})
			
				setTimeout(function(){
						$('.s_right').css({display:'none'}).prev().css({display:'none'});
						$('.worldofwar').css({display:'none'});
						$('body').append(bg_ms);
						document.getElementById('bgmusic').volume = 0.2;
						$('.worldofwar').remove();
					// $('.start').css({display:'none'});
				},2800);
			},1000);
		})
	}

})
