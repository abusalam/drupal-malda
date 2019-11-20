# Contributing

## Guidelines and Documentation

* [Guidelines](https://web.guidelines.gov.in/assets/gigw-manual.pdf) for Indian Government Websites should be followed strictly.
* Contributing Guidelines should contain details about coding standard, linting and testing in the development and testing environment.
* Detail Documentation of Development Setup and contributing guidelines to be prepared in the scope of the project.
* Deployment Documentation in detail mentioning all dependencies and platform specific notes.

## Core Development Discussion

* You may propose new features or improvements of existing project behavior in the projects [GitHub Issue Board](https://github.com/abusalam/drupal-malda/issues). If you propose a new feature, please be willing to implement at least some of the code that would be needed to complete the feature.

* Commits should be atomic and should fix one issue at a time. Each features should be implemented in it’s own branch and to be merged with master when complete.

* All bug fixes should be sent to the latest stable branch which it is related to. Bug fixes should never be sent to the master branch.

* Unit testing and integration testing should be written for throughout coverage and CI platforms like [Travis CI](https://travis-ci.org) should be utilised for the same.

* Standards of the platform and coding should be followed strictly.

* In case of OOPs classes for application logic and business logic should be in separate classes. Classes should not have more than one focus of responsibility. Classes should strictly adhere to **Single Responsibility Principle (SRP)**.

* __Credentials__ should be kept in separate configuration files and only a sample should be included in git with source code.
* Configuration Environment for `Production`, `Local` and `testing` should be clearly defined and maintained in the source code.
* Error Messages should be written carefully so that user can understand and to be displayed for each and every error even if it’s system error due to unmet dependency or missing configuration. Verbosity of Error messages should be changed depending on the environment configuration. Error Message should also contain the reference to the source code with line number.
* Configurations and credential storage of all external dependencies like email, SMS etc. should be robust and customisable depending on platform and situations.

## Code guidelines

### Golden Rule

> Every line of code should appear to be written by a single person, no matter the number of contributors ([source](http://codeguide.co/)).

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

* Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
* Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
* Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

* When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
* Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.

### JS

* No semicolons (in client-side JS)
* 2 spaces (no tabs)
* strict mode
* "Attractive"
