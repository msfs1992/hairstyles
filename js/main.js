var menu = document.getElementById("menuTransitions");
var interface = null;
var main = {
	navigation: document.getElementById("navigation"),
	line1: document.getElementsByClassName('line')[0],
	line3: document.getElementsByClassName('line')[2],
	aim: document.getElementById("cbody"),
	links: document.getElementsByClassName('navigate'),
	navlink: document.getElementsByClassName("navigate-link"),
	gallery:[
		"images/hairstyles/1.jpg",
		"images/hairstyles/2.jpg",
		"images/hairstyles/3.jpg",
		"images/hairstyles/4.jpg",
		"images/hairstyles/5.jpg",
		"images/hairstyles/6.jpg",
		"images/hairstyles/7.jpg",
		"images/hairstyles/8.jpg",
		"images/hairstyles/9.jpg",
		"images/hairstyles/10.jpg",
		"images/hairstyles/11.jpg",
		"images/hairstyles/12.jpg",
		"images/hairstyles/13.jpg",
		"images/hairstyles/14.jpg"
	],
	manageloads: function(imageSrc, index){
		return new Promise(function(resolve, reject){
			var img = new Image();
	        img.onload = function(){
	        	console.log("IMAGE LOADED");
	        	var image_container = document.getElementsByClassName("g_dh")[index];
	        	//image_container.removeChild(image_container.childNodes[0]);
	        	image_container.appendChild(img);
	        	resolve('ok');
	        } 
	        img.onerror = function(){
	        	reject('error');
	        }
	        img.src = imageSrc;
		});
	},
	toggleClass: function(element, classN){
		if (element.classList) { 
		  element.classList.toggle(classN);
		} else {
		  // For IE9
		  var classes = element.className.split(" ");
		  var i = classes.indexOf(classN);

		  if (i >= 0) 
		    classes.splice(i, 1);
		  else 
		    classes.push(classN);
		    element.className = classes.join(" "); 
		}
	},
	ajax: function(url, callback, data) {
		var x;
		try {
			x = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
			x.open(data ? 'POST' : 'GET', url, 1);
			x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			x.onreadystatechange = function () {
				x.readyState > 3 && callback && callback(x.responseText);
			};
			x.send(data)
		} catch (e) {
			window.console && console.log(e);
		}
	},
	menuClick: function(){
		this.toggleClass(menu ,"menusHolderTransition");
		this.toggleClass(this.line1, "line1Close");
		this.toggleClass(this.line3, "line3Close");
		this.toggleClass(this.navigation, "toggleMenu");
	},
	navigate: function(){
		var atributo = this.getAttribute("data-href");
		console.log(atributo);
		var func = null;
		func = function(gotcha){
			this.aim.innerHTML = gotcha;
		}.bind(main);
		switch(atributo){
			case 'home':
				func = function(gotcha){
					this.aim.innerHTML = gotcha;
					var hs = document.getElementsByClassName('hairstyles');
					for (var i = 0; i < hs.length; i++) {
						hs[i].onclick = function(){
							this.ajax('hairstyle.html?v=1.1', function(gotcha){
								this.aim.innerHTML = gotcha;
								this.loadHairstyles();
							}.bind(main), "GET");
/*							$("#cbody").load('hairstyle.html?v=1.1', function(){
								this.loadHairstyles();
							}.bind(this));*/
						}.bind(this);
					}
				}.bind(main);
			break;
			case 'hairstyle':
				func = function(gotcha){
					this.ajax('hairstyle.html?v=1.1', function(gotcha){
						this.aim.innerHTML = gotcha;
						this.loadHairstyles();
					}.bind(this), "GET");
				}.bind(main);
			break;
			default:
				func = function(gotcha){
					this.aim.innerHTML = gotcha;
				}.bind(main);
			break;
		}
		//$("#cbody").load(atributo+'.html', func);
		main.ajax(atributo+'.html', func, "GET");
	},
	navigatelink: function(){
		for(var i =  0; i < main.navlink.length; i++){
			main.navlink[i].className = "navigate-link";
		}
		this.className = "navigate-link selected";
		main.menuClick();
	},
	loadHairstyles: function(){
		var hbox = document.getElementById("gallery");
		for(x in this.gallery){
			var node = document.createElement('a');
			node.className = "g_dh";
		 	node.setAttribute("data-src", this.gallery[x]);
		 	node.innerHTML = '<div class="g_d"><div class="g_calign sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>';
		 		hbox.appendChild(node);
		}
		Promise.all(this.gallery.map(this.manageloads)).then(function(success){
			/*var $methods = $('#lightgallery');
			$methods.lightGallery();*/
			var image_container = document.getElementsByClassName("g_dh");
			console.log(image_container);
			for(var f = 0; f < image_container.length; f++){
				if(image_container[f].childNodes != undefined){
					image_container[f].removeChild(image_container[f].childNodes[0]);	
				}
				
			}
			lightGallery(document.getElementById("gallery"));
		}).catch(function(error){
			console.log(error);
		});
	},
	init: function(){
		this.ajax('home.html?v=1.1', function(gotcha){
			this.aim.innerHTML = gotcha;
			var hs = document.getElementsByClassName('hairstyles');
			for (var i = 0; i < hs.length; i++) {
				hs[i].onclick = function(){
					this.ajax('hairstyle.html?v=1.1', function(gotcha){
						this.aim.innerHTML = gotcha;
						this.loadHairstyles();
					}.bind(main), "GET");
					/*$("#cbody").load('hairstyle.html?v=1.1', function(){
						this.loadHairstyles();
					}.bind(this));*/
				}.bind(this);
			}
		}.bind(this), "GET");
		var flag = true;
		document.getElementById("menuTransitions").addEventListener('click', this.menuClick.bind(this));
		//load pages
		for (var i =  0; i < this.links.length; i++) {
			this.links[i].addEventListener('click', this.navigate);
		}
		//change selected
		for (var i =  0; i < this.navlink.length; i++) {
			this.navlink[i].addEventListener('click', this.navigatelink);
		}
		document.addEventListener("DOMContentLoaded", function(){
		  //document.body.removeChild(document.getElementsByTagName("div")[document.getElementsByTagName("div").length-1]);
		});
	}
};
main.init();