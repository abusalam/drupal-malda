<?php
/**
 * @file
 * Contains \Drupal\quicktabs\TabTypeInterface.
 */

namespace Drupal\quicktabs;

use Drupal\Component\Plugin\PluginInspectionInterface;

/**
 * Defines an interface for tab type plugins.
 */
interface TabTypeInterface extends PluginInspectionInterface {

  /**
   * Return form elemets used on the edit/add from.
   *
   * @param $tab - array
   *
   * @return array
   */
  public function optionsForm(array $tab);
  
  /**
   * Return a render array for an individual tab tat the theme layer to process.
   *
   * @return string
   */
  public function render(array $tab);
  
}
