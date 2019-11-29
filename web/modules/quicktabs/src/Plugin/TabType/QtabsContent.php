<?php
/**
 * @file
 * Contains \Drupal\quicktabs\Plugin\TabType\QtabsContent.
 */

namespace Drupal\quicktabs\Plugin\TabType;

use Drupal\quicktabs\TabTypeBase;

/**
 * Provides a 'qtabs content' tab type.
 *
 * @TabType(
 *   id = "qtabs_content",
 *   name = @Translation("qtabs"),
 * )
 */
class QtabsContent extends TabTypeBase {

  /**
   * {@inheritdoc}
   */
  public function optionsForm(array $tab) {
    $plugin_id = $this->getPluginDefinition()['id'];
    $form = [];
    $tab_options = [];
    foreach (\Drupal::entityTypeManager()->getStorage('quicktabs_instance')->loadMultiple() as $machine_name => $entity) {
      // Do not offer the option to put a tab inside itself.
      if (!isset($tab['entity_id']) || $machine_name != $tab['entity_id']) {
        $tab_options[$machine_name] = $entity->label();
      }
    }
    $form['machine_name'] = array(
      '#type' => 'select',
      '#title' => t('QuickTabs instance'),
      '#description' => t('The QuickTabs instance to put inside this tab.'),
      '#options' => $tab_options,
      '#default_value' => isset($tab['content'][$plugin_id]['options']['machine_name']) ? $tab['content'][$plugin_id]['options']['machine_name'] : '',
    );
    return $form;
  }
  
  /**
   * {@inheritdoc}
   */
  public function render(array $tab) {
    $options = $tab['content'][$tab['type']]['options'];
    $qt = \Drupal::service('entity.manager')->getStorage('quicktabs_instance')->load($options['machine_name']);

    return $qt->getRenderArray();
  }
}
