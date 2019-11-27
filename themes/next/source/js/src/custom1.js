/* 轮播背景图片 */
$(function () {
	var bodyBgs = [];
	bodyBgs[0] = "/images/1.jpg";
	bodyBgs[1] = "/images/2.jpg";
	bodyBgs[2] = "/images/3.jpg";

	var randomBgIndex = Math.round( Math.random() * 3 )+3;

    $.backstretch([  
    	  bodyBgs[randomBgIndex%3],
    	  bodyBgs[(randomBgIndex+1)%3],
    	  bodyBgs[(randomBgIndex-1)%3],
    	  bodyBgs[(randomBgIndex+2)%3]
    ], { duration: 60000, fade: 1000 });  
});
