<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Controller_Twoot extends Controller_Template
{
	public $template = 'site';

	public function action_index()
	{
		// $view = View::factory('site')
  //       	->bind('errors', $errors)
  //       	->bind('twootText', $twootText)
  //       	->bind('twoots', $twoots);

		//->set('values', $_POST)
		
		$twootText = '';
		$errors = [];

		//if (HTTP_Request::POST == $this->request->method())
		if ($_POST)
		{
			$twoot = ORM::factory('Twoot');

			try
			{
				$twoot->userId = '123';
				$twoot->createdAt = DB::expr('Now()');
				$twoot->twootText =  $_POST['twootText'];//$this->request->post().twootText;

				$twoot->save();
			}
			catch (ORM_Validation_Exception $e)
			{
				//$errors = $e->errors('models');
				//$errors = $e->errors('models');
				$errors = $e->errors('models/twoot');
				//$this->template->errors = $errors;
				//$this->view->body->errors = $e->errors('');
				//$this->template->twootText = $twoot->twootText;
				print_r($errors);
				$twootText = $_POST['twootText'];
			}
		}

		// $twoots = ORM::factory('Twoot')
		// 	->where('userId', '=', 123)
		// 	->order_by('createdAt', 'DESC')
		// 	->find_all();
		
		$twoots = Model::factory('Twoot');
		$this->template->twoots = $twoots->get_twoots();
		//if (is_null($this->template->twootText)){
		
		$this->template->twootText = $twootText;
		$this->template->errors = $errors;
		//$this->template->set('errors', );
		//}
	}
}