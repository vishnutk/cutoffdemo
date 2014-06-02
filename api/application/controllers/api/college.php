<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class College extends REST_Controller
{
    public function colleges_get()
    {
        // Display all colleges
		$this->load->database();
		$this->response($this->db->get('colleges')->result());
    }
	
	public function districts_get() {
		// Display all colleges
		$this->load->database();
		$this->response($this->db->get('district')->result());
	}
	
	public function singlecollege_get()
    {
	    if(!$this->get('id'))
        {
        	$this->response(NULL, 400);
        }
        // Display all colleges
		$this->load->database();
		$query = $this->db->query('SELECT id,name,address FROM colleges WHERE id='.$this->get('id'));
		
		$row = $query->row_array();
		
		$this->response($row);
    }

    public function college_post()
    {
        // Create a new college
    }
	function deletecollege_post()
    {
        if(!$this->post('id'))
        {
        	$this->response(NULL, 400);
        }
        // Display all colleges
		$this->load->database();
		
		//$query = $this->db->query('DELETE * FROM colleges WHERE id='.$this->get('id'));
		$this->db->where('id', $this->post('id'));
		$this->db->delete('colleges');
		//$row = $query->row_array();
		$message = array('id' => $this->post('id'), 'message' => 'DELETED!');
        
		$this->response($message, 200);
    }
	 public function addcollege_post()
    {
		$this->load->database();
		$data = array(
			   'collegeID' =>  $this->post('id'),
               'collegeName' =>  $this->post('name'),
               'collegeDist' =>  $this->post('dist'),
			   'collegeType' =>  $this->post('type')
            );
		$query = $this->db->insert('college', $data); 
		$message = array("query"=> $query, "message" => "Added Successfuly");
		$this->response($message, 200);
    }
	
	public function addcourse_post()
    {
		$this->load->database();
		$data = array(
			   'courseCode' =>  $this->post('code'),
               'courseName' =>  $this->post('name'),
               'intake' =>  $this->post('intake'),
			   'startingyear' =>  $this->post('startingyear'),
			   'collegeID' =>  $this->post('collegeID')
            );
		$query = $this->db->insert('course', $data); 
		$message = array("query"=> $query, "message" => "Added Successfuly");
		$this->response($message, 200);
    }

	public function adduser_post()
    {
		$this->load->database();
		
		$query = $this->db->query('SELECT * FROM cutoffuser where mobile = "'.$this->post('userMobile').'"');

		if($query->num_rows() == 0) {
				$data = array(
			   		'mobile' =>  $this->post('userMobile'),
               		'name' =>  $this->post('userName'),
               		'email' =>  $this->post('userEmail')
            	);
			$query = $this->db->insert('cutoffuser', $data); 
		} else {
			$sql = "UPDATE cutoffuser SET loginCnt = loginCnt + 1 WHERE mobile = ".$this->post('userMobile');
		    $query = $this->db->query($sql);
        	$data = $query->result();
		}
		$message = array("query"=> $query, "message" => "Added Successfuly");
		$this->response($message, 200);
    }
    	
	public function addcutoff_post()
    {
		$this->load->database();
		$data = array(
			   'collegeID' =>  $this->post('collegeID'),
			   'courseCode' =>  $this->post('courseID'),
               'seattype' =>  $this->post('seattype'),
               'category' =>  $this->post('category'),
			   'percentage' =>  $this->post('percentage'),
			   'meritno' =>  $this->post('meritno')
            );
		$query = $this->db->insert('cutoff', $data); 
		$message = array("query"=> $query, "message" => "Added Successfuly");
		$this->response($message, 200);
    }
	
	function updatesearchcounter_post() {
		$this->load->database();
		$sql = "UPDATE cutoffuser SET searchCnt = searchCnt + 1 WHERE mobile = ".$this->post('mobileNumber');
	    $query = $this->db->query($sql);
        $data = $query->result();
		
        if($data) {
            $this->response($data, 200);
        } else {
            $this->response(array('error' => 'No Records Found'), 200);
        } 
	}
	
	function searchcollege_post()
    {
		$this->load->database();
        
        $sql = "SELECT * FROM cutoff inner join college on cutoff.collegeID = college.collegeID";
        $sql = $sql . " inner join course on cutoff.courseCode = course.courseCode WHERE";
        
        if($this->post('isPhysical')) {
        	$sql = $sql . " seattype like 'NPH%".substr($this->post('seatType'), -1)."' " ;
        } if($this->post('seatType')[0] === "M" ) {
			$sql = $sql . " seattype like '".substr($this->post('seatType'), 0, 2)."%".substr($this->post('seatType'), -1)."' " ;
		} else {
        	$sql = $sql . " seattype = '" .$this->post('seatType')."'";
        }
        $sql = $sql. " and percentage < ".$this->post('percentage');
        $sql = $sql . " and collegeDist = ".$this->post('distictid');

		if($this->post('isTfws')) {
        	$sql = $sql . " and isTfws = 1";
        }
        
        if($this->post('courseName')) {
        	$sql = $sql . " and course.courseName like '".$this->post('courseName')."%' ";
        }
 //       echo $sql;
         $query = $this->db->query($sql);
        $data = $query->result();
		
        if($data) {
            $this->response($data, 200);
        } else {
            $this->response(array('error' => 'No Records Found'), 200);
        } 
    }
	
//	SELECT DISTINCT SUBSTRING(courseName,1,LOCATE("[", courseName)-2) FROM course
	
	public function courses_get() {
		// Display all colleges
		$this->load->database();
		$sql = 'SELECT DISTINCT SUBSTRING(courseName,1,LOCATE("[", courseName)-2) as courseName FROM course order by courseName';
        $query = $this->db->query($sql);
        $data = $query->result();
		
        if($data) {
            $this->response($data, 200);
        } else {
            $this->response(array('error' => 'No Records Found'), 200);
        }
	}
	
}