<?php

	$link = mysql_connect('localhost', 'root', '');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	
	$db_selected = mysql_select_db('cutoffsearch', $link);
	if (!$db_selected) {
		die ('Can\'t use foo : ' . mysql_error());
	}

	
	$selectquery = "DELETE FROM CUTOFF";
	mysql_query($selectquery);
	
	$selectquery1 = "DELETE FROM COURSE";
	mysql_query($selectquery1);
	
	$selectquery2 = "DELETE FROM COLLEGE";
	mysql_query($selectquery2);


?>



