<?php
namespace Rampart\Model\mysql;

use xPDO\xPDO;

class Ban extends \Rampart\Model\Ban
{

    public static $metaMap = array (
        'package' => 'Rampart\\Model\\',
        'version' => '3.0',
        'table' => 'rampart_bans',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'reason' => NULL,
            'ip' => '',
            'ip_low1' => 0,
            'ip_high1' => 0,
            'ip_low2' => 0,
            'ip_high2' => 0,
            'ip_low3' => 0,
            'ip_high3' => 0,
            'ip_low4' => 0,
            'ip_high4' => 0,
            'hostname' => NULL,
            'email' => NULL,
            'username' => NULL,
            'matches' => 0,
            'createdon' => NULL,
            'editedon' => NULL,
            'editedby' => 0,
            'expireson' => NULL,
            'notes' => NULL,
            'active' => 0,
            'last_activity' => NULL,
            'data' => NULL,
            'service' => 'manual',
        ),
        'fieldMeta' => 
        array (
            'reason' => 
            array (
                'dbtype' => 'tinytext',
                'phptype' => 'string',
                'null' => true,
            ),
            'ip' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'ip_low1' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_high1' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_low2' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_high2' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_low3' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_high3' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_low4' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'ip_high4' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'hostname' => 
            array (
                'dbtype' => 'tinytext',
                'phptype' => 'string',
                'null' => true,
            ),
            'email' => 
            array (
                'dbtype' => 'tinytext',
                'phptype' => 'string',
                'null' => true,
            ),
            'username' => 
            array (
                'dbtype' => 'tinytext',
                'phptype' => 'string',
                'null' => true,
            ),
            'matches' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'createdon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'editedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'editedby' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
                'index' => 'index',
            ),
            'expireson' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
                'index' => 'index',
            ),
            'notes' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
            ),
            'active' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'boolean',
                'null' => false,
                'default' => 0,
                'index' => 'index',
            ),
            'last_activity' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'data' => 
            array (
                'dbtype' => 'mediumtext',
                'phptype' => 'json',
            ),
            'service' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => false,
                'default' => 'manual',
            ),
        ),
        'indexes' => 
        array (
            'editedby' => 
            array (
                'alias' => 'editedby',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'editedby' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'expireson' => 
            array (
                'alias' => 'expireson',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'expireson' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'active' => 
            array (
                'alias' => 'active',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'active' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
        ),
        'composites' => 
        array (
            'Matches' => 
            array (
                'class' => 'Rampart\\Model\\BanMatch',
                'local' => 'id',
                'foreign' => 'ban',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
            'Fields' => 
            array (
                'class' => 'Rampart\\Model\\BanMatchField',
                'local' => 'id',
                'foreign' => 'ban',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
        'aggregates' => 
        array (
            'EditedBy' => 
            array (
                'class' => 'MODX\\Revolution\\modUser',
                'local' => 'editedby',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
