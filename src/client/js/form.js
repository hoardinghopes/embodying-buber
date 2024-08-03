/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-undef: "error" */
/* eslint-env browser */
/* global Iodine */

import "@caneara/iodine";

const CHECK_FIRST = "Please check fields are correctly filled";
const READY_TO_SUBMIT = "Form ready to submit";
const SUBMITTING = "Submitting form";
const SUBMISSION_COMPLETE = "Thank you, form submitted";
const SUBMISSION_FAILURE = "Sorry, the form failed to submit";

function formSetUp() {
  Iodine.setErrorMessages({
    required: " is required",
    email: " must be correctly formatted as email",
  });
  return {
    // inputElements: actual form fields
    inputElements: [],
    // fields: objects holding state info for form fields
    fields: [],
    // simple Boolean switch for show/hide error messages
    disabled: true,
    buttonLabel: CHECK_FIRST,
    init() {
      console.log("formSetUp.init()");
      // get all relevant form fields
      this.inputElements = [
        ...this.$el.querySelectorAll("input[data-rules], textarea[data-rules]"),
      ];

      // populate state objects for them
      this.inputElements.forEach((field) => {
        this.fields[field.name] = {
          errorMessage: "",
          blurred: false,
        };
      });
    },
    // every form event fires this, checking for errors
    input(event) {
      // if the event doesn't come from one of our fields, ignore it
      if (!this.fields[event.target.name]) {
        return false;
      }
      if (event.type === "focusout") {
        this.fields[event.target.name].blurred = true;
      }
      this.disabled = false;
      this.updateErrorMessages();
      // not sure why this returns false, just leaving it as is for now
      return false;
    },
    updateErrorMessages() {
      let hasErrors = false;

      this.inputElements.forEach((el) => {
        const rules = JSON.parse(el.dataset.rules);
        const result = Iodine.assert(el.value.trim(), rules);
        this.fields[el.name].errorMessage = result.error;
        if (!hasErrors) {
          if (!result.valid) {
            hasErrors = true;
          }
        }
      });

      this.disabled = hasErrors;
      if (hasErrors) {
        this.buttonLabel = CHECK_FIRST;
      } else {
        this.buttonLabel = READY_TO_SUBMIT;
      }
    },
    submit(event) {
      event.preventDefault();
      let formIsValid = true;
      this.inputElements.forEach((input) => {
        const result = Iodine.assert(
          input.value,
          JSON.parse(input.dataset.rules),
        );
        if (!result.valid) {
          formIsValid = false;
        }
      });
      if (!formIsValid) {
        return false;
      }

      this.buttonLabel = SUBMITTING;
      this.disabled = true;

      const form = event.currentTarget;
      const url = form.action;
      const formData = new FormData(form);

      fetch(url, {
        method: "post",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            this.buttonLabel = SUBMISSION_COMPLETE;
            this.$el.reset();
          } else {
            this.buttonLabel = SUBMISSION_FAILURE;
          }
          if (!response.ok) {
            throw Error(response.statusText);
          }
        })
        .catch((error) => console.error(error));
      return false;
    },
  };
}
window.formSetUp = formSetUp;

