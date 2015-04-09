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
	if(document.getElementById('password').value !== "" && scrub(document.getElementById('password').value))
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
	if(document.getElementById('email').value !== "")
	{
		if(scrub(document.getElementById('email').value))
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


function signup()
{
	if(validPwd())
	{
		if(validEmail())
		{
			var payload = {
				"pwd" : sha1(document.getElementById("password").value),
				"email" : document.getElementById("email").value
			};
			console.log(payload);
			$.post( "../asset/signup/", payload)
			.done(function( data ) {
				var response = JSON.parse(data);
				console.log(response);
				switch(response.status)
				{
					case 200:
						//successful signup
						window.location = "/dashboard";
						break;
					case 401:
						$("#response").fadeIn(100);
						document.getElementById('response').className = "alert alert-danger";
						// document.getElementById('response').innerHTML = "Oh snap!";
						document.getElementById('response').innerHTML = "It looks like there is a problem with your session. This page has probably been open for too long and our security system reset. Please reload the page and try again!";
						//bad token
						break;
					case 409:
						$("#response").fadeIn(100);
						document.getElementById('response').className = "alert alert-warning";
						// document.getElementById('response').innerHTML = "Oh snap!";
						document.getElementById('response').innerHTML = "Oh snap! There is already an account active with that email address. Please try again with a different email address. If you think this is an error, please email us at oops@usedopamine.com and let us know what happened.";
						break;
				}
			});
						
		}
		else
		{
			alert("There is an issue with the email address you entered. Please make sure your password contains none of the following characters: ' \" / \\ ; & $ : ! # % ( ) { }");
		}
	}
	else
	{
		alert("There is an issue with the password you entered. Please make sure your password contains none of the following characters: ' \" / \\ ; & $ : ! # % ( ) { }");
	}
}

function hideAlert()
{
	$('#response').hide();
}