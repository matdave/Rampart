<?php

namespace Rampart\v2\Processors\WhiteList\Multiple;

class Activate extends \modProcessor
{
    public $languageTopics = array('rampart:default');

    public function process()
    {
        if (!$whitelists = $this->getProperty('position')) {
            return $this->failure($this->modx->lexicon('rampart.whitelist_err_ns'));
        }

        $whitelists = explode(',', $whitelists);

        foreach ($whitelists as $whitelist) {
            $whitelist = $this->modx->getObject('rptWhiteList', $whitelist);
            if (empty($whitelist)) {
                continue;
            }
            $whitelist->set('active', true);

            if ($whitelist->save() === false) {
                return $this->failure($this->modx->lexicon('rampart.whitelist_err_save'));
            }
        }

        return $this->success();
    }
}
