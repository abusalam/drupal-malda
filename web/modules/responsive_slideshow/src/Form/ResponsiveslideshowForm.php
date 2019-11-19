<?php

namespace Drupal\responsive_slideshow\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;

/**
 * @file
 * Contains \Drupal\responsive_slideshow\Form\ResponsiveslideshowForm.
 */
class ResponsiveslideshowForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'responsive_slideshow_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'responsive_slideshow.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('responsive_slideshow.settings');
    $form['responsive_slideshow_no_of_slides'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Number of Slides'),
      '#required' => TRUE,
      '#default_value' => $config->get('responsive_slideshow_no_of_slides'),
      '#weight' => 0,
      '#description' => $this->t('Enter the number of slides to be included in the slideshow.'),
    );
    $form['responsive_slideshow_description_length'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Maximum Description Length'),
      '#required' => TRUE,
      '#default_value' => $config->get('responsive_slideshow_description_length'),
      '#weight' => 1,
      '#description' => $this->t('Enter maximum number of charecters in the description to be displayed in the carousel. If set to zero the description will be displayed full.'),
    );
    $form['responsive_slideshow_interval'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Interval between the slides'),
      '#required' => TRUE,
      '#default_value' => $config->get('responsive_slideshow_interval'),
      '#weight' => 2,
      '#description' => $this->t('Enter the interval between the slides in the carousel in Milliseconds(5000ms = 5sec).'),
    );
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    if ((!is_numeric($form['responsive_slideshow_no_of_slides']['#value'])) || ($form['responsive_slideshow_no_of_slides']['#value'] == 0)) {
      $form_state->setErrorByName('responsive_slideshow_no_of_slides', 'Number of Slides must be a numeric value greater than 0.');
    }
    if (!is_numeric($form['responsive_slideshow_description_length']['#value'])) {
      $form_state->setErrorByName('responsive_slideshow_description_length', 'Maximum Description Length must be a numeric value.');
    }
    if ((!is_numeric($form['responsive_slideshow_interval']['#value'])) || ($form['responsive_slideshow_interval']['#value'] == 0)) {
      $form_state->setErrorByName('responsive_slideshow_interval', 'Interval between the slides must be a numeric value greater than 0.');
    }
  }

  /**
   * Submit handler for responsive_slideshow_form form.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('responsive_slideshow.settings');
    $responsive_slideshow_no_of_slides = $form_state->getValue(['responsive_slideshow_no_of_slides']);
    $responsive_slideshow_description_length = $form_state->getValue(['responsive_slideshow_description_length']);
    $responsive_slideshow_interval = $form_state->getValue(['responsive_slideshow_interval']);
    $config->set('responsive_slideshow_no_of_slides', $responsive_slideshow_no_of_slides);
    $config->set('responsive_slideshow_description_length', $responsive_slideshow_description_length);
    $config->set('responsive_slideshow_interval', $responsive_slideshow_interval);
    $config->save();
    parent::submitForm($form, $form_state);
    drupal_flush_all_caches();
  }

}
