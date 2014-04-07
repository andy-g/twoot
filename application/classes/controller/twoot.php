<?php defined('SYSPATH') OR die('No Direct Script Access');
 
Class Controller_Twoot extends Controller_Template
{
    public $template = 'site';
 
    public function action_index()
    {

		$twoots = ORM::factory('Twoot')
    		->where('userId', '=', 123)
    		->order_by('createdAt', 'DESC')
    		->find_all();

        $this->template->twoots = $twoots;
    }
}