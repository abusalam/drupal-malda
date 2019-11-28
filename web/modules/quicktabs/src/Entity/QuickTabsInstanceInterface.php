<?php
/**
 * @file
 * Contains \Drupal\quicktabs\Entity\QuickTabsInstanceInterface.
 */
 
namespace Drupal\quicktabs\Entity;
 
use Drupal\Core\Config\Entity\ConfigEntityInterface;
 
/**
 * Interface for QuickTabsInstance.
 */
interface QuickTabsInstanceInterface extends ConfigEntityInterface {

  /**
   * Returns the label for the current instance.
   *
   * @return string
   */
  public function getLabel();

  /**
   * Returns the machine name of the plugin that will render this instance.
   *
   * @return string
   */
  public function getRenderer();

  /**
   * Returns the array of options that current instance will use to build a tab.
   *
   * @return array
   */
  public function getOptions();

  /**
   * Returns the array of options that current instance will use to build a tab.
   *
   * @return boolean
   */
  public function getHideEmptyTabs();

  /**
   * Returns the number of the default tab for this instance.
   *
   * @return string
   */
  public function getDefaultTab();

  /**
   * Returns the array of data that will be used to build the tabs.
   *
   * @return array
   */
  public function getConfigurationData();

  /**
   * Sets the configuration data array.
   *
   * @param array
   */
  public function setConfigurationData($configuration_data);

}

?>
