<?php

namespace Drupal\s3waad\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'S3waasUtilities' block.
 *
 * @Block(
 *  id = "s3waas_utilities",
 *  admin_label = @Translation("Utilities"),
 * )
 */
class S3waasUtilities extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 's3waas_utilities';
    $build['s3waas_utilities']['#markup'] = 'Implement S3waasUtilities.';

    return $build;
  }

}
