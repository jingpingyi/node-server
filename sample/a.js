function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}
$('.flip-modal').addEventListener('click', function(e){
	e.stopPropagation();
	if(e.target.classList.contains('login')){
		$('.flip-modal').classList.remove('register')
		$('.flip-modal').classList.add('login')
	}
	if(e.target.classList.contains('register')){
		$('.flip-modal').classList.add('register')
		$('.flip-modal').classList.remove('login')
	}
	if(e.target.classList.contains('fa-close')){
		$('.flip-modal').style.display = 'none'
	}
})
$('header .login').onclick = function(e){
	e.stopPropagation();
	$('.flip-modal').style.display = 'block';
}
$('body').onclick = function(){
	$('.flip-modal').style.display = 'none';
}
// $$('.modal .close').forEach(function(node){
// 	node.onclick = function(){

// 		$('.flip-modal').style.display = 'none'
// 	}
// })

$('.modal-login form').addEventListener('submit', function(e){
	e.preventDefault();
	if(!/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,8}$/.test($('.modal-login input[name=username]').value)){
		$('.modal-login .errmsg').innerText = '用户名需输入3-8个字符，包括字母、数字或汉字'
		return false
	}
	if(!/^\w{6,12}$/.test($('.modal-login input[name=password]').value)){
		$('.modal-login .errmsg').innerText = '密码需输入6-12个字符，包括字母或数字或下划线'
		return false
	}
	this.submit()
})
$('.modal-register form').addEventListener('submit', function(e){
	e.preventDefault();
	if(!/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,8}$/.test($('.modal-register input[name=username]').value)){
		$('.modal-register .errmsg').innerText = '用户名需输入3-8个字符，包括字母、数字或汉字'
		return false
	}
	if(!/^\w{6,12}$/.test($('.modal-register input[name=password]').value)){
		$('.modal-register .errmsg').innerText = '密码需输入6-12个字符，包括字母、数字或下划线'
		return false
	}
	if($('.modal-register input[name=password2]').value!==$('.modal-register input[name=password]').value){
		$('.modal-register .errmsg').innerText = '两次密码不同，请重新输入'
		return false
	}
	// if($().value === ajax.value){
	// $('.modal-register .errmsg').innerText = '用户名已存在，请重新输入'
		// return false
	// }
	this.submit()

})
