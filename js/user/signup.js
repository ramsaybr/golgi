function signupShow()
{
	document.getElementById('credentialsSignUpDivText').innerHTML = "Email. Password twice. Green button. Science!";
	$('#credentialsSignUp').hide();
	$('#credentialsSignInDiv').hide();
	$('#credentialsSignUpHeader').hide();
	$('.credentialsSignUpHidden').show();
	$('#credentialsSignUpAlert').hide();
}

function scrub(value)
{
	console.log("in scrub");
	var illegal = ['\'', '"', '/', '\\', ';', '&', '$', ':', '!', '#', '%', '(', ')', '{', '}'];
	var error = 0;
	for(i=0; i<illegal.length; i++)
	{
		if(value.indexOf(illegal[i]) != -1)
		{
			error++;
		}
	}
	if(error > 0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

window.scrubErrors = [false, false];

function validPwd()
{
	if((document.getElementById('credentialsSignUpPwd1').value !== "" && scrub(document.getElementById('credentialsSignUpPwd1').value)) && (document.getElementById('credentialsSignUpPwd1').value == document.getElementById('credentialsSignUpPwd2').value))
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

function validEmail()
{
	if(document.getElementById('credentialsSignUpEmail').value !== "")
	{
		if(scrub(document.getElementById('credentialsSignUpEmail').value))
		{
			return 1;
		}
		else
		{
			window.scrubErrors[2] = true;
			return 0;
		}
	}
	else
	{
		return 0;
	}
}


function signupSubmit()
{
	if(validPwd())
	{
		if(validEmail())
		{
			var payload = {
				"pwd" : sha1(document.getElementById("credentialsSignUpPwd1").value),
				"email" : document.getElementById("credentialsSignUpEmail").value
			};
			console.log(payload);
			$.post( "../php/signup/", payload)
			.done(function( data ) {
				response = JSON.parse(data);
				switch(response.status)
				{
					case(200):
						hideCredentials();
						$('#credentialsModal').modal('toggle');
						updateAccount(payload.email);
						window.logged = true;
						//successful signup
						break;
					case(409):
						$('#credentialsSignUpAlert').show();
						//already in use
						break;
					case(418):
						//I'm a teapot
						break;
				}
			});
		}
		else
		{
			alert("There is an issue with the email address you entered! Please make sure your email address contains none of the following characters: ' \" / \\ ; & $ : ! # % ( ) { }");
		}
	}
	else
	{
		alert("There is an issue with the password you entered! Please make sure your passwords match and they contain none of the following characters: ' \" / \\ ; & $ : ! # % ( ) { }");
	}
}

function hideAlert()
{
	$('#response').hide();
}

function updateAccount(emailAddress)
{
	console.log(emailAddress);
	var grav_url = "http://www.gravatar.com/avatar/" + md5(emailAddress);
	document.getElementById('userDiv').innerHTML = "<img src='" + grav_url + "' width='25' height='25'/> Logged in as <a style='cursor:pointer' onclick='showAccountInfo()'>" + emailAddress + "</a>";
}