<?php

namespace Drupal\s3waad\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'S3waasSlideshow' block.
 *
 * @Block(
 *  id = "s3waas_slideshow",
 *  admin_label = @Translation("Slideshow"),
 * )
 */
class S3waasSlideshow extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 's3waas_slideshow';
    $build['s3waas_slideshow']['#markup'] = 'Implement S3waasSlideshow.';

    return $build;
  }

}
