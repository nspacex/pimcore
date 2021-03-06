<?php
/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @category   Pimcore
 * @package    Object|Class
 * @copyright  Copyright (c) 2009-2016 pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

namespace Pimcore\Model\Object\ClassDefinition\Data;

use Pimcore\Model;
use Pimcore\Tool;

class Languagemultiselect extends Model\Object\ClassDefinition\Data\Multiselect
{

    /**
     * Static type of this element
     *
     * @var string
     */
    public $fieldtype = "languagemultiselect";


    /**
     * @var bool
     */
    public $onlySystemLanguages = false;

    /**
     *
     */
    public function configureOptions()
    {
        $validLanguages = (array) Tool::getValidLanguages();
        $locales = Tool::getSupportedLocales();
        $options = array();

        foreach ($locales as $short => $translation) {
            if ($this->getOnlySystemLanguages()) {
                if (!in_array($short, $validLanguages)) {
                    continue;
                }
            }

            $options[] = array(
                "key" => $translation,
                "value" => $short
            );
        }

        $this->setOptions($options);
    }

    /**
     * @return bool
     */
    public function getOnlySystemLanguages()
    {
        return $this->onlySystemLanguages;
    }

    /**
     * @param $value
     * @return $this
     */
    public function setOnlySystemLanguages($value)
    {
        $this->onlySystemLanguages = (bool) $value;
        return $this;
    }

    /**
     *
     */
    public function __wakeup()
    {
        $this->configureOptions();
    }
}
