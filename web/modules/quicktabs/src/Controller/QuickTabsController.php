<?php
/**
 * @file
 * Contains \Drupal\quicktabs\Controller\QuickTabsController.
 */

namespace Drupal\quicktabs\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;

class QuickTabsController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function ajaxContent($js, $instance, $tab) {
    if ($js === 'nojs') {
      return [];
    }
    else {
      $type = \Drupal::service('plugin.manager.tab_type');
      $qt = \Drupal::service('entity.manager')->getStorage('quicktabs_instance')->load($instance);
      $configuration_data = $qt->getConfigurationData();
      $object = $type->createInstance($configuration_data[$tab]['type']);
      $render = $object->render($configuration_data[$tab]);

      $element_id = '#quicktabs-tabpage-' . $instance . '-' . $tab;
      $ajax_response = new AjaxResponse();
      $ajax_response->addCommand(new HtmlCommand($element_id, $render));
      return $ajax_response;
    } 
  }
}
?>
