<?php defined('SYSPATH') OR die('No direct access allowed.');

class Model_Twoot extends ORM
{
	/*
	CREATE TABLE IF NOT EXISTS `twoots` (
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `userId` int(11) NOT NULL,
	  `twootText` varchar(140) NOT NULL,
	  `createdAt` datetime NOT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;
	*/

	public function rules()
	{
		return array(
			'twootText' => array(
				array('not_empty'),
				array('max_length', array(':value', 140)),
			),
		);
	}

	public function get_twoots() {
	    return ORM::factory('Twoot')
			->where('userId', '=', 123)
			->order_by('createdAt', 'DESC')
			->find_all();
	}
}