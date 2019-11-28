<?php
/**
 * @file
 * Contains \Drupal\quicktabs\TabRendererBase.
 */

namespace Drupal\quicktabs;

use Drupal\Component\Plugin\PluginBase;
use Drupal\quicktabs\Entity\QuickTabsInstance;

abstract class TabRendererBase extends PluginBase implements TabRendererInterface {

  public function getName() {
    return $this->pluginDefinition['name'];
  }

  /**
   * {@inheritdoc}
   */
  public function optionsForm(QuickTabsInstance $instance) {
    return [];
  }
  
  /**
   * {@inheritdoc}
   */
  abstract public function render(QuickTabsInstance $instance);
}
