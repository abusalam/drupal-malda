<?php

namespace Drupal\responsive_slideshow\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides responsive_slideshow block.
 *
 * @Block(
 *   id = "responsive_slideshow",
 *   admin_label = @Translation("Responsive Slideshow"),
 *   category = @Translation("Blocks")
 * )
 */
class SlideshowBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#type' => 'markup',
      '#markup' => responsive_slideshow_homepage(),
      '#attached' => array(
        'library' => array(
          'responsive_slideshow/responsive-styling',
        ),
      ),
    );
  }

}
