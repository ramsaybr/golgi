<?php
    //connect to db
    session_start();
    $link = mysql_connect('localhost', 'usegol5_golgi', 'g9752pikachu') or die("Cannot connect");
    mysql_select_db('usegol5_flat');
    var_dump(getcwd());
    if (isset($_REQUEST['photo'])) 
    {
        if (($_FILES["uploadedfile"]["size"] < 1000000))
        {
            var_dump($_FILES["uploadedfile"]);
            $realPath = "../img/regions/zoom1/" . $_SESSION['abbreviation'] . ".svg";
            echo $realPath;
            if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $realPath)) 
            {
                $abbrev = $_SESSION['abbreviation'];
                mysql_query("UPDATE region SET hasImage=1 WHERE `abbreviation` = '$abbrev'");
                echo 0;
            }
        } 
        else 
        {
            //fail
            echo "1";
        }
    } 
    else 
    {
        echo "1";
    }
    
    mysql_close();

?>