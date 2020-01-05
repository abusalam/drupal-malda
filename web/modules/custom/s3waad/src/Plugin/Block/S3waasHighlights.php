<?php

namespace Drupal\s3waad\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'S3waasHighlights' block.
 *
 * @Block(
 *  id = "s3waas_highlights",
 *  admin_label = @Translation("Highlights"),
 * )
 */
class S3waasHighlights extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 's3waas_highlights';
    $build['s3waas_highlights']['#markup'] = 'Implement S3waasHighlights.';

    return $build;
  }

}
