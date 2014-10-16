function showCredentials()
{
	$('#credentials').show(100);
}

function hideCredentials()
{
	$('#credentials').hide();
	$('#credentialsSignInDiv').show();
	$('#credentialsSignUpHeader').show();
	document.getElementById('credentialsSignUpDivText').innerHTML = "Save your private notes on regions, connections, molecules and cells. <br>It's like scrawling your brilliant ideas in the margin of a paper. But the future.";
	$('#credentialsSignUp').show();
	$('.credentialsSignUpHidden').hide();
}

function accountLogout()
{
	$.post( "../php/account/logout/")
	.done(function( data ) {
		var response = JSON.parse(data);
		console.log(response);
		if(response.status == 200)
		{
			document.getElementById('userDiv').innerHTML = '<div style="padding-top:10px;"><span class="glyphicon glyphicon-user" style="padding-right:10px;"></span><a style="cursor:pointer" onclick="showCredentials()">Log in or sign up free</a></div>';
			$('#accountInfo').hide();
		}
	});
}

function showAccountInfo()
{
	$('#accountInfo').show();
}