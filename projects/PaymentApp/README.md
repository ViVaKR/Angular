# PaymentApp

## Structure

* src
  * app
    * payment-details
      * payment-details.component.ts | .html `ng g c payment-details`
      * payment-detail-form
        * payment-detail-form.component.ts | .html `ng g c payment-details/payment-detail-form`
    * shared
      * payment-detail.service.ts
      * payment-detail.model.ts `ng g cl shared/payment-detail --type=model`
    * app.module.ts
* styles.css
* index.html (cdn path for bootstrap & icons)

`prompt $g`

```bash
  ng g c payment-details
  ng g c payment-details/payment-detail-form
  ng g cl payment-detail --type=model
  ng g environments
```

## bootstrap

```html

 https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js

```
