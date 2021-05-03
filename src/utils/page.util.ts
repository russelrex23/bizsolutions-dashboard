declare let $: any;

export class PageUtil {

    /**
     * Show modal.
     * @param id - modal id.
     */
    public static showModal(id: string): void {
        this.hideActiveModal();
        $('#' + id).modal('show');

        setTimeout(() => {
            const body = $('body');

            if (!body.hasClass('modal-open')) {
                body.addClass('modal-open');
            }
        }, 2000);
    }

    /**
     * Hide modal.
     * @param id - modal id.
     */
    public static hideModal(id: string): void {
        $('#' + id).modal('hide');
    }

    /**
     * Hide active-academic-years modal in the current page.
     */
    public static hideActiveModal(): void {
        $('.modal').modal('hide');
    }

    /**
     * Click event.
     * @param id - element id
     */
    public static click(id: string): void {
        $('#' + id).trigger('click');
    }

    /**
     * Set timeout based on the specified number of seconds before reloading the page.
     * @param seconds - number of seconds - optional
     */
    public static reload(seconds: number = 0): void {
        setTimeout(() => {
            location.reload();
        }, seconds * 1000);
    }

    /**
     * Add on click event listener to the specified selector;
     * @param selector - selector name
     * @param handler - event handler
     */
    public static onClick(selector: string, handler: any): void {
        const body = document.querySelector('body');

        if (body) {
            body.addEventListener('click', (event) => {
                const target = event.target as Element;
                const isElementExists = target && (target.matches(selector) || target.closest(selector));

                if (isElementExists) {
                    handler();
                }
            });
        }
    }
}
