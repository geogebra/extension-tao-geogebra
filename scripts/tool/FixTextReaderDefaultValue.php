<?php

namespace geogebra\pci\scripts\tool;

use League\Flysystem\Adapter\Local;
use oat\oatbox\action\Action;
use geogebra\pci\model\update\ItemFixTextReaderDefaultValue;

/**
 * Class FixGeoGebraDefaultValue
 * Usage : sudo -u www-data php index.php 'oat\pciSamples\scripts\tool\FixGeoGebraDefaultValue' run
 * @package geogebra\pci\scripts\tool
 */
class FixGeoGebraDefaultValue implements Action
{

    public function __invoke($params)
    {
        $run = false;
        if (!empty($params) && $params[0] === 'run') {
            $run = true;
        }

        \common_ext_ExtensionsManager::singleton()->getExtensionById('taoQtiItem');

        $dir = \taoItems_models_classes_ItemsService::singleton()->getDefaultItemDirectory();

        // maybe it's a dirty way but it's quicker. too much modification would have been required in ItemUpdater
        $adapter = $dir->getFileSystem()->getAdapter();
        if (!$adapter instanceof Local) {
            throw new \Exception(__CLASS__.' can only handle local files');
        }

        $itemUpdater = new ItemFixGeoGebraDefaultValue($adapter->getPathPrefix());
        $res = $itemUpdater->update($run);
        if ($run) {
            return \common_report_Report::createSuccess('Item fixed ' . count($res));
        } else {
            return \common_report_Report::createInfo('Item to be fixed ' . count($res));
        }
    }
}