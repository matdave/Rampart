<?php
/**
 * @package rampart
 */
$xpdo_meta_map['rptBanMatchField']= array (
  'package' => 'rampart',
  'version' => '1.1',
  'table' => 'rampart_ban_matches_bans',
  'extends' => 'xPDOObject',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' => 
  array (
    'ban' => 0,
    'ban_match' => 0,
    'field' => '',
  ),
  'fieldMeta' => 
  array (
    'ban' => 
    array (
      'dbtype' => 'int',
      'precision' => '11',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'pk',
    ),
    'ban_match' => 
    array (
      'dbtype' => 'int',
      'precision' => '11',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'pk',
    ),
    'field' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '60',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
      'index' => 'pk',
    ),
  ),
  'indexes' => 
  array (
    'PRIMARY' => 
    array (
      'alias' => 'PRIMARY',
      'primary' => true,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'ban' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'ban_match' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'field' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'Ban' => 
    array (
      'class' => 'rptBan',
      'local' => 'ban',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'BanMatch' => 
    array (
      'class' => 'rptBanMatch',
      'local' => 'ban_match',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
