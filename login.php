<?php

session_start();
if (isset($_REQUEST['logout'])) 
{
    //clear session
    session_unset();
    session_destroy();
    setcookie('uID', "", time() - 3600);
}
else
{
	if(isset($_COOKIE['uID']))
	{
		//already logged in
		header('location: update.php');
	}
	else
	{
		if (isset($_REQUEST['attempt'])) 
		{
		    $fail = 0;
		    $userRaw = $_POST['u'];

		    if ($_POST['p'] == "") 
		    {
		        $pass = "";
		    }
		    else
		    {
		        $pass = sha1($_POST['p']);
		    }


		    if ($userRaw == "" || $pass == "") {
		        $fail = 1;

		    }
		    if ($userRaw != "" && !filter_var($userRaw, FILTER_VALIDATE_EMAIL)) 
		    {
		        $fail = 2;
		    }


		    if ($fail == 0) 
		    {
		        $link = mysql_connect('localhost', 'usegol5_golgi', 'g9752pikachu') or die("Cannot connect");
				mysql_select_db('usegol5_flat');
		        $user = mysql_real_escape_string($_POST['u']);


		        $query = mysql_query("SELECT * FROM user WHERE email = '$user' AND passw = '$pass' AND adminStatus='1'");
		        $total = mysql_num_rows($query);
		        $userResult = mysql_fetch_array($query);
		        if ($total == '1') 
		        {
		            $cookieDate = 60 * 60 * 24 * 3 + time();
		            setcookie('uID', $userResult[0], $cookieDate);
		            $_SESSION['uID'] = $userResult[0];
		            header('location: update.php');
		        }
		        mysql_close();
		    }
		}
		
	}
}

include('php/header.php');

?>

<div style="position:absolute; left:0px; width:100%; top:0px; height:100%;">
	<div style="position:relative; margin-left:auto; margin-right:auto; top:00px; height:40px; width:100%; background-color:#2c3e50; box-shadow: 0px 1px 5px 1px #000;">
		<div style="position:relative; margin-left: auto; margin-right: auto; top:50px; width:960px; height:40px;">
			<img src="img/brainMap.png" style="position:absolute; left:0px; top:-45px; z-index:10; width:30px; height:30px;"/>
			<span style="position: absolute; left:40px; font-size:14px; font-family:Raleway; top:-40px; color:#ecf0f1;">Golgi</span>
		</div>
	</div>
	<?php

		if($fail != 0)
		{
			echo ' <div style="position:relative; margin-left:auto; margin-right:auto; top:40px; height:40px; width:600px; border-radius:5px; border:2px solid rgba(192, 57, 43,1.0); background-color:rgba(231, 76, 60,0.4); text-align:center;">
			Oops - there was a problem with your login info! Please try again.
		</div> ';
		}

	?>
	<div style="position:relative; margin-left:auto; margin-right:auto; top:80px; height:270px; width:300px; border-radius:20px; border:2px solid #ecf0f1; background-color:#DFE3E6; box-shadow: 0px 0px 10px 0px #424242;">
		<div style="position:absolute; left:0px; width:100%; top:40px; font-size:16px; color:#424242; text-align: center;">
			Log in to continue:
		</div>
		<form action="login.php?attempt" method="post">
			<input name="u" style="position:absolute; left:50px; width:200px; top:100px; height:30px; font-size:16px; color:#424242; text-align: center;" type="text" value="Email Address" id="email" onFocus="clearEmail()"/>
			<input name="p" style="position:absolute; left:50px; width:200px; top:150px; height:30px; font-size:16px; color:#424242; text-align: center;" type="text" value="Password" id="passw" onFocus="clearPwd()"/>
			<button type="submit" class="btn btn-success" style="position:absolute; left:55px; width:194px; top:200px; height:30px; font-size:16px; text-align: center;">Log in</button>
		</form>
	</div>
</div>

<?php

include('php/footer_update.php');

?>
</html>