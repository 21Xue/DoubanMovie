
	// Fullscreen		
	function startFS() {
		$('body').fullscreen();
	}

	function exitFS() {		
		$.fullscreen.exit();
	}

	function clickFS() {

		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
			$('body').fullscreen();
		} else {
			$.fullscreen.exit();
		}

	}

	function language_change(lang) {
			$.cookie('language', lang);
			location_reload();
			 
	}

	

	function getWorldTime(tzOffset, addmin) { // 24시간제
		var now = new Date();
		var tz = now.getTime() + (now.getTimezoneOffset() * 60000) + (tzOffset * 3600000) + (addmin * 60000);
		now.setTime(tz);

		var s =
		leadingZeros(now.getFullYear(), 4) + '-' +
		leadingZeros(now.getMonth() + 1, 2) + '-' +
		leadingZeros(now.getDate(), 2) + ' ' +

		leadingZeros(now.getHours(), 2) + ':' +
		leadingZeros(now.getMinutes(), 2) + ':' +
		leadingZeros(now.getSeconds(), 2);

		return s;
	}

	function leadingZeros(n, digits) {
		var zero = '';
		n = n.toString();

		if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
		zero += '0';
		}
		return zero + n;
	}



	function reset_menu(id, page) {
		$('#weekly_menu td').removeClass('active');
		$('#' + id).addClass('active');
	}
	
	function location_reload() {

		if(navigator.userAgent.match(/TOPTOON/)) {

			try
			{
				var page = location.href.split("#");
				if(page[1] == '' || page[1] == undefined) {
					location = "/?redirect=/";
				} else {
					var temptime = new Date();
					var temp = temptime.getTime();
					location = "/?redirect=" + page[1];
				}
			}
			catch (e)
			{
					location = "/";
			}
		
		} else {

			location.reload(true);
		
		}

	}



	// VIEWER LOAD
	function load_viewer(comic_id, episode_idx, redirect) {

		if(redirect == '' || redirect == undefined) {
			var page = location.href.split("#");
			var redirect = "#" + page[1];
		}


		$('#viewer_loading_text').show();
		$('#viewer_data').html('');
		$('#viewer').html("");
		$('#viewer').load("/comic/episode_frame?comic_id=" + comic_id + "&episode_idx=" + episode_idx);

		try
		{
			swiper_frame.allowSlidePrev = true;
			swiper_frame.allowSlideNext = true;
			swiper_frame.slideTo(3, 300);
			swiper_frame.allowSlidePrev = false;
			swiper_frame.allowSlideNext = false;
		}
		catch (e)
		{
		}

		//$('#viewer_header_io').load("/comic/episode_frame?comic_id=" + comic_id + "&episode_idx=" + episode_idx + " #viewer_header");
		//$('#viewer_footer_io').load("/comic/episode_frame?comic_id=" + comic_id + "&episode_idx=" + episode_idx + " #viewer_footer");
		try
		{
			$('#load_page_id').val("#contents_" + comic_id + ',' + episode_idx);
			location = "#contents_" + comic_id + "," + episode_idx;
			//startFS();
		}
		catch (e)
		{
		}
	}


	// TOP
	function gotop() {
		
		$("html").animate( { scrollTop: 0,  },  100,  function(){
		    $("html").clearQueue();
		} );

		$("body").animate( { scrollTop: 0,  },  100,  function(){
		    $("body").clearQueue();
		} );
				
		$("#all_frame").animate( { scrollTop: 0,  },  100,  function(){
		    $("#all_frame").clearQueue();
		} );
		
		$("#all_frame2").animate( { scrollTop: 0,  },  100,  function(){
		    $("#all_frame2").clearQueue();
		} );

		$("#main_page_frame").animate( { scrollTop: 0,  },  100,  function(){
		    $("#main_page_frame").clearQueue();
		} );
		
		$(".swiper-container-frame").animate( { scrollTop: 0,  },  100,  function(){
		    $(".swiper-container-frame").clearQueue();
		} );

		$("#swiper-container").animate( { scrollTop: 0,  },  100,  function(){
		    $("#swiper-container").clearQueue();
		} );


	}

	// TOP
	function gotop2() {
		
		$("html").animate( { scrollTop: 0,  },  100,  function(){
		    $("html").clearQueue();
		} );

		$("body").animate( { scrollTop: 0,  },  100,  function(){
		    $("body").clearQueue();
		} );
				
		$("#all_frame").animate( { scrollTop: 0,  },  100,  function(){
		    $("#all_frame").clearQueue();
		} );
		
		$("#all_frame2").animate( { scrollTop: 0,  },  100,  function(){
		    $("#all_frame2").clearQueue();
		} );

		$("#sub_page_div").animate( { scrollTop: 0,  },  100,  function(){
		    $("#sub_page_div").clearQueue();
		} );
		
		$("#main_page_frame").animate( { scrollTop: 0,  },  100,  function(){
		    $("#main_page_frame").clearQueue();
		} );

		$(".swiper-container-frame").animate( { scrollTop: 0,  },  100,  function(){
		    $(".swiper-container-frame").clearQueue();
		} );
		
	}

	// TOP
	function gotop3() {
				
		$("#swiper-container").css("position", "relative");
		
		$("#main_page_frame").animate( { scrollTop: 50,  },  100,  function(){
		    //$("#main_page_frame").clearQueue();
			$("#swiper-container").css("position", "sticky");
		} );

		$("#sub_page_div").animate( { scrollTop: 0,  },  100,  function(){
		    //$("#sub_page_div").clearQueue();
		} );


	}


	// TOP
	function contents_top() {
	

		$("#main_page_frame").animate( { scrollTop: 50,  },  100,  function(){
		    $("#main_page_frame").clearQueue();
		} );
		
		$(".swiper-container-frame").animate( { scrollTop: 0,  },  100,  function(){
		    $(".swiper-container-frame").clearQueue();
		} );

	}

	// PAGE CALL
	function call_page(id) {
		$('#event_20180420').slideUp(800);
		var page = location.href.split("#");
		if((id == "library" || id == "giftbox" || id == "giftbox_end" || id == "mypage" || id == "favorites" || id == "recent" || id == "useredit" || id == "support") && ($.cookie('user_idx') == undefined || $.cookie('user_idx') == '0' || $.cookie('user_idx') == '')) {
			load_alert('login');
		} else if(id == page[1]) {
			load_page(id);
		} else {
			location = "#" + id;
		}
	}
		
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var useredit_set = 0;
	function useredit_call(id, value, hash) {
		if(useredit_set == 0) {
			useredit_set = 1;
			$.post("/member/useredit_proc",
			{
				ci_token: hash,
				id: id,
				value: value
			},
			function(data, status){

				useredit_set = 0;

				var t = data.split("|");

				if(t[1] == "NEED_LOGIN") {
					alert(t[0]);
					load_alert("login");
				} else if(t[1] == "PASS_CHANGE_OK") {
					alert(t[0]);
					location_reload(); //location.reload(true);
				} else if(t[1] == "EXIT_OK") {
					$.cookie('save_id', '');
					$.cookie('auto_login', '');
					$.cookie('auto_key', '');
					alert(t[0]);
					location = "/";
				} else if(t[1] == "LANG_CHANGE") {
					$.cookie('language', t[0]);
					if(t[2] != '') {
						$.cookie('load_alert', t[2], { expires: 7, path: '/' });
					}
					location = "/";
				} else {
					if(data != '') {
						alert(data);
					}
				}

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	var reg_giftbox_set = 0;
	function giftbox_reg(idx, source, hash) {

		if(reg_giftbox_set == 0) {
			reg_giftbox_set = 1;
			$.post("/comic/giftbox_get",
			{
				ci_token: hash,
				source: source,
				idx: idx
			},
			function(data, status){
				reg_giftbox_set = 0;
						console.log('giftreg:start');

				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}

				var t = data.split("|");
				alert(t[0]);
				if(t[1] != 'undefined') { 
					console.log('giftreg:' + t[1]);
					load_page('contents_' + t[1]);
				} else if(source == 2) {
						console.log('giftreg:x');
						load_page('giftbox');
				} else {
						console.log('giftreg:error');
					load_page();
				}

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var buy_set = 0;
	function episode_buy(idx, hash) {
		if(buy_set == 0) {
			buy_set = 1;
			$.post("/comic/episode_buy_proc",
			{
				ci_token: hash,
				episode_idx: idx,
			},
			function(data, status) {
				buy_set = 0;
				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}

				$('#load_page').html(data);
			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}

	var rent_set = 0;
	function episode_rent(idx, hash) {
		if(rent_set == 0) {
			rent_set = 1;
			$.post("/comic/episode_rent_proc",
			{
				ci_token: hash,
				episode_idx: idx,
			},
			function(data, status) {
				rent_set = 0;
				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}
				$('#load_page').html(data);
			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var reg_rating_set = 0;
	function rating_reg(comic_idx, episode_idx, vote, hash) {

		if(reg_rating_set == 0) {
			reg_rating_set = 1;
			$.post("/comic/rating_check",
			{
				ci_token: hash,
				comic_idx: comic_idx,
				episode_idx: episode_idx,
				vote: vote
			},
			function(data, status){
				reg_rating_set = 0;

				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}
				
				$('#rating_board').hide();

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////




	var reg_favorites_set = 0;
	function favorites_reg(comic_idx, hash) {

		if(reg_favorites_set == 0) {
			reg_favorites_set = 1;
			$.post("/comic/favorites_check",
			{
				ci_token: hash,
				comic_idx: comic_idx
			},
			function(data, status){
				reg_favorites_set = 0;

				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}

				if(data == "ON") {
					$('#favorites_tab').addClass("favorites2_active");
					$('#favorites_text').hide();
					$('#favorites_text_del').show();
				} else {
					$('#favorites_tab').removeClass("favorites2_active");
					$('#favorites_text').show();
					$('#favorites_text_del').hide();
				}

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}

	function favorites_reg_viewer(comic_idx, hash) {

		if(reg_favorites_set == 0) {
			reg_favorites_set = 1;
			$.post("/comic/favorites_check",
			{
				ci_token: hash,
				comic_idx: comic_idx
			},
			function(data, status){
				reg_favorites_set = 0;

				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}

				if(data == "ON") {
					$('#contents_alert').val(1);
					alerts_hover();
					$('#favorites_tab').addClass("favorites2_active");
					$('#favorites_text').hide();
					$('#favorites_text_del').show();
				} else {
					$('#contents_alert').val(0);
					alerts_out();
					$('#favorites_tab').removeClass("favorites2_active");
					$('#favorites_text').show();
					$('#favorites_text_del').hide();
				}

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var favorites_set = 0;
	function remove_favorites(idx, index, hash) {

		if(favorites_set == 0) {
			favorites_set = 1;
			$.post("/comic/favorites_remove",
			{
				ci_token: hash,
				idx: idx
			},
			function(data, status){
				favorites_set = 0;

				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}

				$('#contents_cell_' + index).css('opacity', '0.1');
				alert(data);

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var recent_set = 0;
	function remove_recent(idx, index, hash) {

		if(recent_set == 0) {
			recent_set = 1;
			$.post("/comic/recent_remove",
			{
				ci_token: hash,
				idx: idx
			},
			function(data, status){
				recent_set = 0;

				if(data == 'NEED_LOGIN') {
					load_alert('login'); return false;
				}

				//$('#contents_cell_' + index).fadeOut();
				$('#contents_cell_' + index).css('opacity', '0.1');

			}).error(function(xhr, desc, err) { 
				error_proc(err);
			});
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var check_set = 0;
	function episode_click(idx, hash) {
		
		try
		{	
			 if(check_set == 0) {
				check_set = 1;
				$.post("/comic/episode_check",
				{
					ci_token: hash,
					episode_idx: idx
				},
				function(data, status){
					check_set = 0;

					var t = data.split("|");
					if(t[0] == 'MSG') { 
						alert(t[1]);
					} else if(t[0] == 'ALERT') {
						load_alert(t[1], t[2]);
					} else if(t[0] == 'VIEWER') {
						load_viewer(t[1], t[2]);
					} else if(t[0] == 'PAGE') {
						load_page(t[1]);
					}
				}).error(function(xhr, desc, err) { 
					error_proc(err);
				});
			}

		}
		catch (e)
		{
			alert("ERROR : 0003");
		}

	}

	////////////////////////////////////////////////////////////////////////////////////////////

	function error_proc(err) { 
			if("Forbidden" == err) {
				alert("ERROR : 0001");
				location_reload(); //location.reload(true); 
			} else if("Internal Server Error" == err) {
				alert("ERROR : 0002");
				location_reload(); //location.reload(true); 
			} else {
				alert(err);
				location_reload(); //location.reload(true); 
			}
	}