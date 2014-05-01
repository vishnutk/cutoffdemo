<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class College extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function index()
	{
		$this->load->helper('url');
		$this->load->model('Collegemodel');
		$this->load->view('college_message');
	}
	public function save_college() {
		  //$this->load->model('books/books_model','books');
		  $data = array(
			'name' => $this->input->post('name'),
			'address' => $this->input->post('address')
		  );
		  $this->Collegemodel->add($data);
		 
		  $new_books = $this->books->get();
		  print json_encode($new_books);
		  exit();
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */