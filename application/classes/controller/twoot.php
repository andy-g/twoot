<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Controller_Twoot extends Controller_Template
{
	public $template = 'site';

	public function action_index()
	{
		$twootText = '';
		$errors = [];

		if ($_POST)
		{
			$twoot = ORM::factory('Twoot');

			try
			{
				$twoot->userId = '123';
				$twoot->createdAt = DB::expr('Now()');
				$twoot->twootText =  $_POST['twootText'];

				$twoot->save();
			}
			catch (ORM_Validation_Exception $e)
			{
				$errors = $e->errors('models/twoot');
				$twootText = $_POST['twootText'];
				//print_r($errors);
			}
		}

		$twoots = Model::factory('Twoot');

		$this->template->twoots = $twoots->get_twoots();
		$this->template->twootText = $twootText;
		$this->template->errors = $errors;
	}
}