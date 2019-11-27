/* 轮播背景图片 */
$(function () {
	var bodyBgs = [];
	bodyBgs[0] = "/images/1.jpg";
	bodyBgs[1] = "/images/2.jpg";
	bodyBgs[2] = "/images/3.jpg";
	bodyBgs[3] = "/images/4.jpg";
	bodyBgs[4] = "/images/5.jpg";
	bodyBgs[5] = "/images/6.jpg";

	var randomBgIndex = Math.round( Math.random() * 6 )+6;

    $.backstretch([  
    	  bodyBgs[randomBgIndex%6],
    	  bodyBgs[(randomBgIndex+1)%6],
    	  bodyBgs[(randomBgIndex-1)%6],
    	  bodyBgs[(randomBgIndex+2)%6],
    	  bodyBgs[(randomBgIndex-2)%6],
    	  bodyBgs[(randomBgIndex+3)%6],
    	  bodyBgs[(randomBgIndex-3)%6]
    ], { duration: 60000, fade: 1000 });  
});
