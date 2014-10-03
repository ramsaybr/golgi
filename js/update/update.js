function clearEmail()
{
	if(document.getElementById('email').value == "Email Address")
	{
		document.getElementById('email').value = "";
	}
}

function clearPwd()
{
	if(document.getElementById('passw').value == "Password")
	{
		document.getElementById('passw').value = "";
		document.getElementById('passw').type="password"
	}
}

window.regionID=0;

function details(id)
{
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function()
	{
		if (xmlHttp.readyState==4 && xmlHttp.status==200)
		{
			var response = JSON.parse(xmlHttp.responseText);
			console.log(response);
			window.regionID = id;
			document.getElementById('name').innerHTML = response.name;
			document.getElementById('abbreviation').value = response.abbreviation;
			if(response.X === null || response.X <= 0)
			{
				document.getElementById('X').style.boxShadow = "0px 0px 10px 0px #F00";
				document.getElementById('X').value = " ";
			}
			else
			{
				document.getElementById('X').value = response.X;
				document.getElementById('X').style.boxShadow = "";
			}
			
			if(response.Y === null || response.Y <= 0)
			{
				document.getElementById('Y').style.boxShadow = "0px 0px 10px 0px #F00";
				document.getElementById('Y').value = " ";
			}
			else
			{
				document.getElementById('Y').value = response.Y;
				document.getElementById('Y').style.boxShadow = "";
			}
			
			if(response.width === null || response.width <= 0)
			{
				document.getElementById('width').style.boxShadow = "0px 0px 10px 0px #F00";
				document.getElementById('width').value = " ";
			}
			else
			{
				document.getElementById('width').value = response.width;
				document.getElementById('width').style.boxShadow = "";
			}

			if(response.height === null || response.height <= 0)
			{
				document.getElementById('height').style.boxShadow = "0px 0px 10px 0px #F00";
				document.getElementById('height').value = " ";
			}
			else
			{
				document.getElementById('height').value = response.height;
				document.getElementById('height').style.boxShadow = "";
			}

			if(response.interactionX === null || response.interactionX <= 0)
			{
				document.getElementById('interactionX').style.boxShadow = "0px 0px 10px 0px #F00";
				document.getElementById('interactionX').value = " ";
			}
			else
			{
				document.getElementById('interactionX').value = response.interactionX;
				document.getElementById('interactionX').style.boxShadow = "";
			}

			if(response.interactionY === null || response.interactionY <= 0)
			{
				document.getElementById('interactionY').style.boxShadow = "0px 0px 10px 0px #F00";
				document.getElementById('interactionY').value = " ";
			}
			else
			{
				document.getElementById('interactionY').value = response.interactionY;
				document.getElementById('interactionY').style.boxShadow = "";
			}
			
			document.getElementById('history').innerHTML = "";
			if(response.history.length > 0)
			{
				//region has been updated previously

				for(i=0; i<response.history.length; i++)
				{
					//console.log("Updated on " + response.history[i].dateTime + " by " + response.history[i].fName);
					var newHTML = '<div style="position: relative; left:0px; top:0px; height:30px; width:100%;"><span style="position:absolute; left:0px; top:0px; height:30px; width:30px; background-color:#9b59b6; color:#FFF; font-size:16px; border-radius:30px;"><span style="position: absolute; left:8px; top:5px;">' + response.history[i].fName[0] + '</span></span><span style="position: absolute; left:40px; top:5px;">Last updated by ' + response.history[i].fName + ' on ' + response.history[i].dateTime + '</span></div>';
					document.getElementById('history').innerHTML = document.getElementById('history').innerHTML + newHTML;
				}
			}
			
		}
	};
	xmlHttp.open("GET","update?id=" + id,false);
	xmlHttp.send();

}

function update()
{
	var completed = 0;
	if(document.getElementById('X').value == "X Position" || document.getElementById('X').value == " ")
	{
		var X = 0;
	}
	else
	{
		completed++;
		var X = document.getElementById('X').value;
		X = X.replace(' ', '');
	}
	if(document.getElementById('Y').value == "Y Position" || document.getElementById('Y').value == " " || document.getElementById('Y').value == "")
	{
		var Y = 0;
	}
	else
	{
		completed++;
		var Y = document.getElementById('Y').value;
		Y = Y.replace(' ', '');
	}
	if(document.getElementById('width').value == "Width" || document.getElementById('width').value == " ")
	{
		var width = 0;
	}
	else
	{
		completed++;
		var width = document.getElementById('width').value;
		width = width.replace(' ', '');
	}
	if(document.getElementById('height').value == "Height" || document.getElementById('height').value == " ")
	{
		var height = 0;
	}
	else
	{
		completed++;
		var height = document.getElementById('height').value;
		height = height.replace(' ', '');
	}
	if(document.getElementById('interactionX').value == "Pin X" || document.getElementById('interactionX').value == " ")
	{
		var interactionX = 0;
	}
	else
	{
		completed++;
		var interactionX = document.getElementById('interactionX').value;
		interactionX = interactionX.replace(' ', '');
	}
	if(document.getElementById('interactionY').value == "Pin Y" || document.getElementById('interactionY').value == " ")
	{
		var interactionY = 0;
	}
	else
	{
		completed++;
		var interactionY = document.getElementById('interactionY').value;
		interactionY = interactionY.replace(' ', '');
	}
	if(window.regionID != 0)
	{
		if(completed > 0)
		{
			console.log(Y);
			var jsonData =
			{
				// id: window.regionID,
				// X: X.replace(' ', ''),
				// Y: Y.replace(' ', ''),
				// width: width.replace(' ', ''),
				// height: height.replace(' ', ''),
				// interactionX: interactionX.replace(' ', ''),
				// interactionY: interactionY.replace(' ', '')
				id: window.regionID,
				X: X,
				Y: Y,
				width: width,
				height: height,
				interactionX: interactionX,
				interactionY: interactionY
			};
			console.log(jsonData);
			xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function()
			{
				if (xmlHttp.readyState==4 && xmlHttp.status==200)
				{
					var response = JSON.parse(xmlHttp.responseText);
					console.log(response);
					document.getElementById('points').innerHTML = response.score;
					document.getElementById('completion').style.width = response.completion + "%";
					if(response.scoreChange > 0)
					{
						//roll dice for reinforcement
						roll();
					}
				}
			};
			xmlHttp.open("GET","update/save.php?j=" + JSON.stringify(jsonData),false);
			xmlHttp.send();
		}
		else
		{
			alert("Please change at least one entry");
		}
	}
	else
	{
		alert("Please select a region on the left");
	}
}

function roll()
{
	$('#reward').hide();
	$('#feedback').hide();
	//roll dice for reinforcement
	var roll = Math.floor(Math.random() * (10)) + 1;
	console.log(roll);
	if(roll <= 3)
	{
		var img = Math.floor(Math.random() * (17)) + 1;
		console.log(img);
		$('#reward').show();
		document.getElementById('rewardImg').src = "img/update/awesome" + img + ".png";
		$('#feedbackBox').fadeIn(100).delay(2000).fadeOut(100);
	}
	else
	{
		$('#feedback').show();
		$('#feedbackBox').fadeIn(100).delay(2000).fadeOut(100);
	}
}