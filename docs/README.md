# Official Website of Malda on Drupal 8

[![Build Status](https://travis-ci.org/abusalam/drupal-malda.svg?branch=docs)](https://travis-ci.org/abusalam/drupal-malda)

## Basic Features of the website
* Theme of the contents to be consistent across the relative segments. Layout should be fluid and can make optimal use of the users screen size (i.e. responsive).
* The official [website of malda district](http://www.malda.gov.in) should have a look and feel similar to the [S3waaS](https://www.s3waas.gov.in) framework with a off-white non-uniform grainy textured background with consistent single font and size with no italics and subtle colours may be used to highlight.
* The website contents to be published using an article based repository along with the implementation of user-role based mechanism for adding new content, editing existing content and moderation before publishing the contents.
* The website home page should have a full width auto rotating banner with various pictured from the district.

### Utility Applications
* __Citizen Services:__ Data Repository for uploading various data related to schemes and their reports with proper searching mechanism.
* __Causelist for SDO Court:__ Data entry, searching and reporting with SMS integration.
* __What’s New:__ The latest publications accumulated from notices, tenders etc should be displayed in this section with option for addendum, corrigendum, archival and searching.
* __Online Recruitment:__ Publication of various documents and results related to recruitments, and a database based searching mechanism should be there for results.
* __Events:__ Various eGovernance activities with photographs can be published in a timeline representation alongwith with upcoming events.
* __Public Grievance:__ Complaint can be received through the portal with SMS to the intended authority and action taken report should be delivered through SMS to the complainant.
* Feedback received should be sent through e-Mail and SMS to the respective content owner and there should be an option to publish them along with the reply as FAQ if required.
* Sitemaps should be generated automatically upon addition or deletion of contents.

## Timeline for Development
> Preparation of detail [timeline](ROADMAP.md) is in progress...

## Some Docker Commands for ready reference

All the commands should run from the root

- **Start Docker:**
    `docker-compose up -d`

- **Stop Docker:**
    `docker-compose stop`

- **Run Coding Standard Tests in Docker:**
    `docker-compose exec php phpcs web/themes/custom`

- **Fix Coding Standard Issues using Docker:**
    `docker-compose exec php phpcbf -v web/themes/custom`

- **Export Database from Docker:**
    `docker-compose exec mariadb sh -c 'exec mysqldump -uroot -p"password" drupal' > mariadb-init/drupal.sql`

## Contributing

Please adhere to the [contributing guidelines](CONTRIBUTING.md).

## Credits
This project includes works from various open source projects.

* [Composer template for Drupal projects](https://github.com/drupal-composer/drupal-project): If you want to know how to use it visit the [Documentation on drupal.org](https://www.drupal.org/node/2471553).
* [Docker-based Drupal stack](https://github.com/wodby/docker4drupal): Read the docs on [**how to use**](https://wodby.com/docs/stacks/drupal/local#usage)