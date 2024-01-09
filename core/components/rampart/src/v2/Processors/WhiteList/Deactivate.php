<?php

namespace Rampart\v2\Processors\WhiteList;

class Deactivate extends \modObjectProcessor
{
    public $classKey = 'rptWhiteList';
    public $objectType = 'rampart.whitelist';
    public $languageTopics = array('rampart:default');

    public function initialize()
    {
        $id = $this->getProperty('id', false);
        if (empty($id)) {
            return $this->modx->lexicon('rampart.whitelist_err_ns');
        }
        $this->object = $this->modx->getObject($this->classKey, $id);
        if (empty($this->object)) {
            return $this->modx->lexicon('rampart.whitelist_err_nf');
        }
        return true;
    }
    public function process()
    {
        $this->object->set('active', false);
        $this->object->set('editedon', strftime('%Y-%m-%d %H:%M:%S'));
        $this->object->set('editedby', $this->modx->user->get('id'));

        if ($this->object->save() === false) {
            return $this->failure($this->modx->lexicon('rampart.whitelist_err_save'));
        }

        return $this->success('', $this->object);
    }
}
