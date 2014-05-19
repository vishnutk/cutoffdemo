<?php
	require_once 'Excel/reader.php';
	$data = new Spreadsheet_Excel_Reader();
	$data->setOutputEncoding('CP1251');
	
	//$data->setUTFEncoder('mb')
/***
* if you want you can change 'iconv' to mb_convert_encoding:
* $data->setUTFEncoder('mb');
*
**/

/***
* By default rows & cols indeces start with 1
* For change initial index use:
* $data->setRowColOffset(0);
*
**/



/***
*  Some function for formatting output.
* $data->setDefaultFormat('%.2f');
* setDefaultFormat - set format for columns with unknown formatting
*
* $data->setColumnFormat(4, '%.3f');
* setColumnFormat - set format for column (apply only to number fields)
*
**/

	$data->read('newdata123.xls');

	$link = mysql_connect('localhost', 'root', '');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	
	$db_selected = mysql_select_db('cutoffsearch', $link);
	if (!$db_selected) {
		die ('Can\'t use foo : ' . mysql_error());
	}

	$indexRow = 1;
	$isSave = false;
	
	$cutOffQuery = "INSERT INTO cutoff (collegeID, courseCode, seattype, category, percentage, meritno) VALUES ";
	
	error_reporting(E_ALL ^ E_NOTICE);

	for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
		//$cutOffQuery = "INSERT INTO cutoff (collegeID, courseCode, seattype, category, percentage, meritno) VALUES ";
		for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) {
			if($data->sheets[0]['cells'][$i][1] == "Index") {
				$indexRow = $i;
			}
			if($data->sheets[0]['cells'][$i][1] == "Data") {
				if($data->sheets[0]['cells'][$i][$j] && $data->sheets[0]['cells'][$indexRow][$j] && $data->sheets[0]['cells'][$i][$j] != "Data") {
					$cutOffQuery = $cutOffQuery. "(1006, 100624510, ";
					$cutOffQuery = $cutOffQuery ." '". $data->sheets[0]['cells'][$i][6] ."', ";
					$cutOffQuery = $cutOffQuery ." '". $data->sheets[0]['cells'][$indexRow][$j] ."', ";
					$marks = explode(" ", $data->sheets[0]['cells'][$i][$j]);
					$marks[1] = str_replace('(', '', $marks[1]);
					$marks[1] = str_replace(')', '', $marks[1]);
					$cutOffQuery = $cutOffQuery. $marks[1] .", ";
					
					$cutOffQuery = $cutOffQuery. $marks[0];
					$cutOffQuery = $cutOffQuery. "),";
					$isSave = true;
				}
			}
//			echo $data->sheets[0]['numRows'] . "<br>";
		}

		//echo "<br/>";
	}
		if($isSave) {
			$cutOffQuery = rtrim($cutOffQuery, ',');
			echo $cutOffQuery;
			//$isSave = false;
			$result = mysql_query($cutOffQuery);

			if (!$result) {
				$message  = 'Invalid query: ' . mysql_error() . "\n";
				$message .= 'Whole query: ' . $query;
				die($message);
			}
		}
/*


 $data->sheets[0]['numRows'] - count rows
 $data->sheets[0]['numCols'] - count columns
 $data->sheets[0]['cells'][$i][$j] - data from $i-row $j-column

 $data->sheets[0]['cellsInfo'][$i][$j] - extended info about cell
    
    $data->sheets[0]['cellsInfo'][$i][$j]['type'] = "date" | "number" | "unknown"
        if 'type' == "unknown" - use 'raw' value, because  cell contain value with format '0.00';
    $data->sheets[0]['cellsInfo'][$i][$j]['raw'] = value if cell without format 
    $data->sheets[0]['cellsInfo'][$i][$j]['colspan'] 
    $data->sheets[0]['cellsInfo'][$i][$j]['rowspan'] 
*/
/* $link = mysql_connect('localhost', 'root', '');
if (!$link) {
    die('Could not connect: ' . mysql_error());
} */
//echo 'Connected successfully';

/* $db_selected = mysql_select_db('cutoffsearch', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
} */
// Check connection
/* if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: ";
} */

$collegeQuery = "";
$branchQuery = "";
$cutOffQuery = "";

$collegeid = "123";
$branchid = "567";







/* for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
 	if($data->sheets[0]['cells'][$i][1]) {
			$collegeQuery = "insert into college(collegeID, collegeType, collegeName, collegeDist) values (" . $data->sheets[0]['cells'][$i][1]. ", 'govt' ,'".$data->sheets[0]['cells'][$i][2] ."', 1)";
			$collegeid = $data->sheets[0]['cells'][$i][1];
			//$result = mysql_query($collegeQuery);

 		if (!$result) {
			$message  = 'Invalid query: ' . mysql_error() . "\n";
			$message .= 'Whole query: ' . $query;
			die($message);
		} 
	}
	
 	if($data->sheets[0]['cells'][$i][3]) {
			$branchQuery = "insert into course(courseCode, courseName, intake, startingyear, collegeID) values (" . $data->sheets[0]['cells'][$i][3]. ", '".$data->sheets[0]['cells'][$i][4] ."', 60, 2002, ".$data->sheets[0]['cells'][$i][1].")";
			$branchid = $data->sheets[0]['cells'][$i][3];
			//$result = mysql_query($branchQuery);

 		if (!$result) {
			$message  = 'Invalid query: ' . mysql_error() . "\n";
			$message .= 'Whole query: ' . $query;
			die($message);
		} 
	} 
	$cutOffQuery = "insert into cutoff values(collegeID, courseCode, seattype, category, percentage, meritno) ";// values (";
	
	for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) {
		if($j == 1) {
			$cutOffQuery = $cutOffQuery. ",";
		}
		if($data->sheets[0]['cells'][$i][$j] && $data->sheets[0]['cells'][1][$j]) {
	
			$cutOffQuery =  $cutOffQuery . ", values (". $collegeid.", ".$branchid.", '".$data->sheets[0]['cells'][$i][5]."', '".$data->sheets[0]['cells'][1][$j]."','".$data->sheets[0]['cells'][$i][$j]."')";
	
	}
 		if($data->sheets[0]['cells'][$i][1]) {
			$collegeQuery = "insert into college(collegeID, collegeType, collegeName, collegeDist) values (" . $data->sheets[0]['cells'][$i][1]. ", 'govt' ,".$data->sheets[0]['cells'][$i][2] .", 1)";
			echo $collegeQuery;
			//mysql_query($con, $collegeQuery);
		} 


	}
	//$cutOffQuery = $cutOffQuery . ")";
	echo $cutOffQuery;
	echo "<br/>";
	
		echo "<br/>";
		
			echo "<br/>";


} */

?>



