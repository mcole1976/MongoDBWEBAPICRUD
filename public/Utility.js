// setTimeout(function() {
//     //alert('Button Clicked!');
//     button.disabled = false;
// }, 1000);



class FormUtils {
    /**
     * Disables a button.
     * @param {HTMLButtonElement} button - The button to disable.
     */
    static disableButton(button) {
        button.disabled = true;
    }

    /**
     * Enables a button after a specified delay.
     * @param {HTMLButtonElement} button - The button to enable.
     * @param {number} delay - The delay in milliseconds before enabling the button.
     */
    static enableButtonAfterDelay(button, delay = 1000) {
        setTimeout(() => {
            button.disabled = false;
        }, delay);
    }
}