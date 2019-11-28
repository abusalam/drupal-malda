<?php
/**
 * @file
 * Contains \Drupal\quicktabs\TabTypeBase.
 */

namespace Drupal\quicktabs;

use Drupal\Component\Plugin\PluginBase;

abstract class TabTypeBase extends PluginBase implements TabTypeInterface {

  protected function getName() {
    return $this->pluginDefinition['name'];
  }

  /**
   * {@inheritdoc}
   */
  abstract public function optionsForm(array $tab);
  
  /**
   * {@inheritdoc}
   */
  abstract public function render(array $tab);
}
