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

	//    public function rules()
	// {
	// 	return array(
	// 		'username' => array(
	// 			// Uses Valid::not_empty($value);
	// 			array('not_empty'),
	// 			// Calls Some_Class::some_method('param1', 'param2');
	// 			array('Some_Class::some_method', array('param1', 'param2')),
	// 			// Calls A_Class::a_method($value);
	// 			array(array('A_Class', 'a_method')),
	// 			// Calls the lambda function and passes the field value and the validation object
	// 			array(function($value, Validation $object)
	// 			{
	// 				$object->error('some_field', 'some_error');
	// 			}, array(':value', ':validation')),
	// 		),
	// 	);
	// }
}