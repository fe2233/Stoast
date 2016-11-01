function toast(options) {
	var intervalCounter = [], clientHeight = 0;
	var h, f, c, b, t;
	var setting={
		 height:45,
		 fontSize:14,
		 color:"#fff",
		 backgroundColor:"rgba(0,0,0,0.8)",
		 time:3000
	 };
	 
	 function init(){
		setting=$.extend({},setting,options);
		clientHeight = $(window).height();
		
		h=setting.height;
		f=setting.fontSize;
		c = setting.color;
		b = setting.backgroundColor;
		t = setting.time;
	}
	
	function drawToast(text) {
		var toast = $(".toast");
			
		var bottomPos = null;
		var index = null;
		var bottom = clientHeight*5/100;
		
		if(toast == null) {
			bottomPos = bottom;
			index = 0;
		} else {
			index = toast.length;
			bottomPos = toast.length*55+bottom;
		}
		
		var toastHTML = '<div class="toast" index="'+index+'">'+text+'</div>';
		$("body").append(toastHTML);
		
		var newestToast = $(".toast[index='"+index+"']");
		newestToast.css({"height":h+"px","line-height":h+"px","font-size":f+"px","color":c,"background-color":b,
			"position":"fixed","width":"40%","border-radius":"5px","text-align":"center","z-index":"1200","display":"none",
			"bottom":bottomPos+"px","left":"30%","transition":"all 0.3s ease","opacity":0,"box-shadow":"0px 0px 10px 0px rgba(0, 0, 0, 0.2)"
		});
	
		newestToast.html(text);
		newestToast.show();
		newestToast.css("opacity", 1);
		
		intervalCounter[index] = setInterval(function() {
			hideToast(index);
		}, t);
	};
 
	function hideToast(index) {
		var toastView = $(".toast[index='"+index+"']");
		toastView.css("opacity", 0);
		setTimeout(function() {
			toastView.hide();
			clearInterval(intervalCounter[index]);
			$(".toast[index='"+index+"']").remove();
		}, 300);
	};
	
	init();
	
	return drawToast;
}
