# TextApp

## 사경(寫經) 및 간경(看經), 송경(誦經), 강경(講經)

## VAlidataeions for Template-driven Forms

1. Required
2. minlength
3. maxlength
4. email
5. min
6. max

>- Section 1: Validators
Validators are functions used to validate form inputs. Angular provides built-in validators like Validators.required, Validators.minLength, Validators.maxLength, etc. You can also create custom validators by creating a function that returns a ValidatorFn or an array of ValidatorFn. Validators play a vital role in ensuring the correctness of user input.

>- Section 2: FormGroup
FormGroup represents a collection of form controls.
It allows you to group related form controls together, providing validation and value tracking for the entire group.
FormGroup enables you to manage and validate complex forms by organizing form controls into logical groups.

>- Section 3: FormControl
FormControl represents an individual form control, such as an input field.
It tracks the value and validation state of the control.
FormControl provides properties like value, valid, invalid, dirty, touched, and more, which allow you to access and manipulate the control’s state.

>- Section 4: FormArray
FormArray represents an array of form controls or form groups.
It is particularly useful when dealing with dynamic forms where the number of controls can change.
FormArray allows you to manage and validate a growing collection of form controls.

>- Section 5: Dirty
The dirty property of a form control indicates whether the control value has changed.
It becomes true when the user modifies the value of the control.
The dirty state is essential for tracking user interactions and triggering specific actions based on changes.

>- Section 6: Touched
The touched property of a form control indicates whether the control has been blurred or focused.
It becomes true when the user interacts with the control
(e.g., clicks inside the input and then clicks outside).
The touched state helps validate user input and provide appropriate feedback.

>- Section 7: Pristine
The pristine property of a form control indicates whether the control is in its initial state.
It becomes true if the control value has not been changed.
The pristine state is useful for implementing conditional behavior based on whether a user has interacted with the control or not.

>- Section 8: Value
The value property of a form control or form group represents the current value of the control.
It allows you to access or update the value programmatically.
The value property is crucial for retrieving user input or setting default values dynamically.

>- Section 9: Valid and Invalid
The valid property of a form control or form group indicates whether the control or group has passed all its validations.
It becomes true if all validations pass.
Conversely, the invalid property indicates whether the control or group has failed any of its validations.
It becomes true if any validation fails. These properties are useful for conditionally enabling or disabling form submission based on the form’s validity.

>- Section 10: Summary and Next Steps
Understanding validators, dirty, touched, pristine, value, and other Angular form properties is fundamental to building robust and interactive forms. Armed with this knowledge, you can create forms that validate user input, track user interactions, and adapt to changing form states. Experiment with these concepts, explore additional form features, and refer to the Angular documentation for further details.
