<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Collegemodel extends CI_Model {

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
	function deleteUser($id)
	{
		alert($id);
		/* $this->load->database();
		$this->db->delete('colleges', array('id' => $id)); 
		alert("User deleted successfully"); */
	}
	
	function insert_college()
	{
		alert("college added successfully");
	}
}