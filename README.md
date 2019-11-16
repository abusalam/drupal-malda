# Official website of Malda

[![Build Status](https://travis-ci.org/abusalam/drupal-malda.svg?branch=dev)](
  https://travis-ci.org/abusalam/drupal-malda)

Please go through the [documentation](docs/README.md) for directions on opening
 issues, coding standards, and notes on development.

## Usage

1. Copy `.env.dist` to `.env`
2. Command to start docker:
    ```
    docker-compose up -d
    ```
3. Open URL http://drupal.docker.localhost:8000/ and use the following values
  to install Drupal 8
    ```env
    Database Name = drupal
    Database User = drupal
    Password      = drupal
    Database Host = mariadb
    ```
4. Command to clear Drupal 8 cache:
    ```
    docker-compose exec php drush cr
    ```
5. Backup database:
    ```
    docker-compose exec mariadb sh -c 'exec mysqldump -uroot -p"password" drupal' > mariadb-init/drupal.sql
    ```
    when staring docker using `docker-compose` it will automatically restore
     the database from `mariadb-init/drupal.sql`.
4. Command to stop docker:
    ```
    docker-compose stop
    ```

## Timeline for Development
> Preparation of detail [timeline](docs/ROADMAP.md) is in progress...

## Contributing
Please adhere to the [contributing guidelines](docs/CONTRIBUTING.md).

## Credits

* [Composer template for Drupal projects](https://github.com/drupal-composer/drupal-project): If you want to know how to use it visit the [Documentation on drupal.org](https://www.drupal.org/node/2471553).
* [Docker-based Drupal stack](https://github.com/wodby/docker4drupal): Read the docs on [**how to spin up**](https://wodby.com/docs/stacks/drupal/local#usage)