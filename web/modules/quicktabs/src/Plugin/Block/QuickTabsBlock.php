<?php

/**
 * @file
 * Contains \Drupal\quicktabs\Plugin\Block\QuickTabsBlock.
 */

namespace Drupal\quicktabs\Plugin\Block;

use Drupal\Core\Block\BlockBase;
Use Drupal\Core\Url;
Use Drupal\Core\Link;
use Drupal\Core\Template\Attribute;

/**
 * Provides a 'QuickTabs' block.
 *
 * @Block(
 *   id = "quicktabs_block",
 *   admin_label = @Translation("QuickTabs Block"),
 *   category = @Translation("QuickTabs"),
 *   deriver = "Drupal\quicktabs\Plugin\Derivative\QuickTabsBlock"
 * )
 */

class QuickTabsBlock extends BlockBase {
  
  /**
   * {@inheritdoc}
   */
  public function build() {
    $qt_id = $this->getDerivativeId();
    $qt = \Drupal::service('entity.manager')->getStorage('quicktabs_instance')->load($qt_id);

    return $qt->getRenderArray();
  }
}
