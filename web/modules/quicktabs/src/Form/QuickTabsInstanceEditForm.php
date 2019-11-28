<?php
/**
 * @file
 * Contains \Drupal\quicktabs\Form\QuickTabsInstanceEditForm.php
 */

namespace Drupal\quicktabs\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element;
use Drupal\Core\Url;
use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\AppendCommand;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\quicktabs\Entity\QuickTabsInstance;

/**
 * Class QuickTabsInstanceEditForm
 *
 */
class QuickTabsInstanceEditForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'quicktab_instance_edit';
  }

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $renderer_options = array('accordian', 'quicktabs', 'ui_tabs');
    
    $form = parent::form($form, $form_state);

    $form['label'] = array(
      '#title' => $this->t('Name'),
      '#description' => $this->t('This will appear as the block title.'),
      '#type' => 'textfield',
      '#default_value' => $this->entity->label(),
      '#weight' => -9,
      '#required' => TRUE,
      '#placeholder' => $this->t('Enter name'),
    );

    $form['id'] = array(
      '#type' => 'machine_name',
      '#maxlength' => 32,
      '#required' => TRUE,
      '#default_value' => $this->entity->id(),
      '#machine_name' => array(
        'exists' => 'Drupal\quicktabs\Entity\QuickTabsInstance::getQuickTabsInstance',
      ),
      '#description' => $this->t('A unique machine-readable name for this QuickTabs instance. It must only contain lowercase letters, numbers, and underscores. The machine name will be used internally by QuickTabs and will be used in the CSS ID of your QuickTabs block.'),
      '#weight' => -8,
    );

    // Instantiate all TabRenderer plugins 
    $type = \Drupal::service('plugin.manager.tab_renderer');
    $plugin_definitions = $type->getDefinitions();
    $renderers = [];
    $renderer_form_options = [];

    // Use the name of each plugin to create the dropdown
    foreach ($plugin_definitions as $index => $def) {
      $renderers[$index] = $def['name']->__toString();
      $object = $type->createInstance($index);
      $renderer_form_options[$index] = $object->optionsForm($this->entity);
    }

    $form['renderer'] = array(
      '#type' => 'select',
      '#title' => $this->t('Renderer'),
      '#options' => $renderers,
      '#default_value' => $this->entity->getRenderer(),
      '#description' => $this->t('Choose how to render the content.'),
      '#weight' => -7,
    );

    // Add the renderer options form elements to the form. 
    // Ue Drupal Form API magic to ensure only the selected rendrer options are visible
    $form['options'] = array('#tree' => TRUE, '#weight' => -6);
    foreach ($renderer_form_options as $renderer => $options) {
      foreach ($options as &$option) {
        $option['#states'] = array('visible' => array(':input[name="renderer"]' => array('value' => $renderer)));
      }
      $form['options'][$renderer] = $options;
    }

    $form['hide_empty_tabs'] = array(
      '#type' => 'checkbox',
      '#title' => $this->t('Hide empty tabs'),
      '#default_value' => $this->entity->getHideEmptyTabs(),
      '#description' => $this->t('Empty and restricted tabs will not be displayed. Could be useful when the tab content is not accessible.<br />This option does not work in ajax mode.'),
      '#weight' => -3,
    );

    $tab_titles = array(
      QuickTabsInstance::QUICKTABS_DELTA_NONE => t('- None -'),
    );

    // Create a table with each tr corresponding to a tab
    $qt = new \stdClass;
    if (!empty($form_state->getValue('configuration_data'))) {
      $qt->tabs = $form_state->getValue('configuration_data');
    }
    else {
      $qt->tabs = $this->entity->getConfigurationData();
    }

    // Show 2 empty tabs when adding a new QT instance
    if (empty($qt->tabs)) {
      $qt->tabs = array(
        0 => [],
        1 => [],
      );
    }
    else {
      if (is_numeric($form_state->get('to_remove'))) {
        unset($qt->tabs[$form_state->get('to_remove')]);
        $form_state->set('num_tabs', $form_state->get('num_tabs') - 1);
      }

      // If the number of rows has been incremented
      // add another row
      if ($form_state->get('num_tabs') > count($qt->tabs)) {
        $qt->tabs[] = [];
      }
    }
    
    $delta = 0;
    if (!empty($qt->tabs)) {
      foreach ($qt->tabs as $tab) {
        if (!empty($tab)) {
          $tab_titles[$delta] = $tab['title'];
          $delta++;
        }
      }
    }

    $form['default_tab'] = array(
      '#type' => 'select',
      '#title' => t('Default tab'),
      '#options' => $tab_titles,
      '#default_value' => $this->entity->getDefaultTab(),
      '#access' => !empty($tab_titles),
      '#weight' => -4,
    );


    $form['configuration_data_wrapper'] = array(
      '#tree' => FALSE,
      '#weight' => -3,
      '#prefix' => '<div class="clear-block" id="configuration-data-wrapper">',
      '#suffix' => '</div>',
    );
    $form['configuration_data_wrapper']['configuration_data'] = $this->getConfigurationDataForm($qt);

    // There are two functions attached to the more button
    // The submit function will be called first and will used to increment the number of rows
    // The callback function will then return the rendered rows
    $form['tabs_more'] = array(
      '#name' => 'tabs_more',
      '#type' => 'submit',
      '#value' => t('Add tab'),
      '#attributes' => array(
        'class' => array('add-tab'),
        'title' => t('Click here to add more tabs.')
      ),
      '#weight' => 1,
      '#submit' => array(array($this, 'ajaxFormSubmit')),
      '#ajax' => array(
        'callback' => array($this, 'ajaxFormCallback'),
        'progress' => array(
          'type' => 'throbber',
          'message' => NULL,
        ), 
        'effect' => 'fade',
      ),
    );

    // The form js will ensure that only one set of tab options is visible
    $form['#attached']['library'][] = 'quicktabs/quicktabs.form';

    return $form;
  }

  /**
   * Ajax callback for the add tab and remove tab buttons.
   * Returns the table rows
   */
  public function ajaxFormCallback(array &$form, FormStateInterface $form_state) {
    // Instantiate an AjaxResponse Object to return.
    $ajax_response = new AjaxResponse();
    $ajax_response->addCommand(new HtmlCommand('#configuration-data-wrapper', $form['configuration_data_wrapper']['configuration_data']));

    return $ajax_response;
  }
  
  /**
   * Submit handler for the 'Add Tab' and 'Remove' buttons.
   * Removes a row or increments the number of rows depending which button is clicked
   */
  public function ajaxFormSubmit(array &$form, FormStateInterface $form_state) {
    if ($form_state->getTriggeringElement()['#name'] === 'tabs_more') {
      $form_state->set('num_tabs', count($form_state->getValue('configuration_data')) + 1);
      $form_state->setRebuild(TRUE);
    }
    else if (is_numeric($form_state->getTriggeringElement()['#row_number'])) {
      $form_state->set('to_remove', $form_state->getTriggeringElement()['#row_number']);
      $form_state->setRebuild(TRUE);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function validate(array $form, FormStateInterface $form_state) {
    $id = $form_state->getValue('id');

    if (empty($id)) {
      $form_state->setErrorByName('machine_name', t('The quicktabs machine name is required.'));
    }
    elseif (!preg_match('!^[a-z0-9_]+$!', $id)) {
      $form_state->setErrorByName('machine_name', t('The quicktabs machine name must contain only lowercase letters, numbers, and underscores.'));
    }

    $tabs = $form_state->getValue('tabs');
    if (!isset($tabs)) {
      $form_state->setErrorByName('', t('At least one tab should be created.'));
    }
    else {
      foreach ($tabs as $j => $tab) {
        if (empty($tab['title'])) {
          $form_state->setErrorByName('tabs][' . $j . '][title', t('Title is required for each tab.'));
        }
      }
    }
  }
  
  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    // We need the configuration_data array to be indexed according to weight
    // So change the indexes here
    $ordered_configuration_data = [];
    foreach ($this->entity->getConfigurationData() as $item) {
      $ordered_configuration_data[] = $item;
    }
    $this->entity->setConfigurationData($ordered_configuration_data);

    $status = $this->entity->save();
    if($status==SAVED_NEW) {
      $form_state->setRedirect('quicktabs.admin');
    }
    drupal_set_message($this->t('Your changes have been saved.'));
  }

  private function getConfigurationDataForm($qt) {
    $configuration_data = array(
      '#type' => 'table',
      '#header' => array(
         t('Tab title'),
         t('Tab weight'),
         t('Tab type'),
         t('Tab content'),
         t('Operations'),
      ),
      '#empty' => t('There are no tabs yet'),
      '#tabledrag' => array(
        array(
          'action' => 'order',
          'relationship' => 'sibling',
          'group' => 'mytable-order-weight',
        ),
      ),
    );

    foreach ($qt->tabs as $index => $tab) {
      $tab['entity_id'] = $this->entity->id();
      $tab['delta'] = $index;
      $configuration_data[$index] = $this->getRow($index, $tab);
    }
    
    return $configuration_data;
  }

  private function getRow($row_number, $tab = NULL) {
    if ($tab === NULL) {
      $tab = [];
    }

    $type = \Drupal::service('plugin.manager.tab_type');
    $plugin_definitions = $type->getDefinitions();

    $types = [];
    foreach ($plugin_definitions as $index => $def) {
      $name = $def['name'];
      $types[$index] = $name->render();
    }

    $options = array('op1' => 'option 1', 'op2' => 'option 2');

    ksort($types);
    $row = [];
    // TableDrag: Mark the table row as draggable.
    $row['#attributes']['class'][] = 'draggable';
    // TableDrag: Sort the table row according to its existing/configured weight.
    $row['#weight'] = isset($tab['weight']) ? $tab['weight'] : 0;
      
    $row['title'] = array(
      '#type' => 'textfield',
      '#size' => '10',
      '#default_value' => isset($tab['title']) ? $tab['title'] : '',
    );

    // TableDrag: Weight column element.
    $row['weight'] = array(
      '#type' => 'weight',
      '#title' => t('Weight'),
      '#title_display' => 'invisible',
      '#default_value' =>  isset($tab['weight']) ? $tab['weight'] : 0,
      // Classify the weight element for #tabledrag.
      '#attributes' => array('class' => array('mytable-order-weight')),
    );
      
    $row['type'] = array(
      '#type' => 'select',
      '#options' => $types,
      '#default_value' => isset($tab['type']) ? $tab['type'] : key($types),
    );
      
    foreach ($plugin_definitions as $index => $def) {
      $name = $def['name'];
      $row['content'][$index] = array(
        '#prefix' => '<div class="' . $index . '-plugin-content plugin-content qt-tab-options-form qt-tab-' . $index . '-options-form" >',
        '#suffix' =>'</div>',
      );
      $object = $type->createInstance($index);
      $row['content'][$index]['options'] = $object->optionsForm($tab);
    }

    // There are two functions attached to the remove button
    // The submit function will be called first and will used to remove the selected row
    // The callback function will then return the rendered rows
    $row['operations'] = array(
      '#row_number' => $row_number,
      '#name' => 'row-' . $row_number, // We need this - the call to getTriggeringElement when clicking the remove button won't work without it
      '#type' => 'submit',
      '#value' => $this->t('Remove'),
      '#attributes' => array('class' => array('delete-tab'), 'title' => t('Click here to delete this tab.')),
      '#submit' => array(array($this, 'ajaxFormSubmit')),
      '#ajax' => array(
        'callback' => array($this, 'ajaxFormCallback'),
        'progress' => array(
          'type' => 'throbber',
          'message' => NULL,
        ), 
        'effect' => 'fade',
      ),
    );

    return $row;
  }
}
