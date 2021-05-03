import {PageUtil} from './page.util';

declare let VanillaToasts: any;
declare let $: any;

export class NotificationUtil {

    /**
     * Show toast notification.
     * @param message - message to be displayed in the toast notification.
     */
    public static show(message: string): void {
        PageUtil.hideActiveModal();
        VanillaToasts.create({
            title: '',
            text: message,
            type: 'info', // success, info, warning, error   / optional parameter
            // icon: '/assets/images/logo.png', // optional parameter
            timeout: 10000 // hide after 5000ms, // optional paremter
            // callback: function() { ... } // executed when toast is clicked / optional parameter
        });
    }

    /**
     * Show toast notification.
     * @param message - message to be displayed in the toast notification.
     */
    public static success(message: string): void {
        PageUtil.hideActiveModal();
        VanillaToasts.create({
            title: '',
            text: message,
            type: 'success', // success, info, warning, error   / optional parameter
            // icon: '/assets/images/logo.png', // optional parameter
            timeout: 10000 // hide after 5000ms, // optional paremter
            // callback: function() { ... } // executed when toast is clicked / optional parameter
        });
    }

    /**
     * Show toast notification.
     * @param message - message to be displayed in the toast notification.
     */
    public static error(message: string): void {
        PageUtil.hideActiveModal();
        VanillaToasts.create({
            title: '',
            text: message,
            type: 'error', // success, info, warning, error   / optional parameter
            // icon: '/assets/images/logo.png', // optional parameter
            timeout: 10000 // hide after 5000ms, // optional paremter
            // callback: function() { ... } // executed when toast is clicked / optional parameter
        });
    }

    /**
     * Show default toast notification.
     */
    public static default(): void {
        PageUtil.hideActiveModal();
        VanillaToasts.create({
            title: '',
            text: 'Can\'t connect to the server at the moment. Please check your internet connection and try again.',
            type: 'error', // success, info, warning, error   / optional parameter
            // icon: '/assets/images/logo.png', // optional parameter
            timeout: 10000 // hide after 5000ms, // optional paremter
            // callback: function() { ... } // executed when toast is clicked / optional parameter
        });
    }

    /**
     * Show notification modal with custom message.
     * @param message - message to be displayed in the modal
     */
    public static showNotificationDialog(message: string): void {
        const notificationDialog = document.getElementById('notificationDialog');

        if (notificationDialog === null) {
            $('body').append('<div id="notificationDialog" class="modal fade">\n' +
                '    <div class="modal-dialog modal-confirm modal-dialog-centered">\n' +
                '        <div class="modal-content">\n' +
                '            <div class="modal-header flex-column">\n' +
                '                <div class="icon-box-danger" style="border: 3px solid green;">\n' +
                '                    <i class="fa fa-check text-success"></i>\n' +
                '                </div>' +
                '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
                '            </div>\n' +
                '            <div class="modal-body">\n' +
                '                <h5 id="notificationDialogMessage" class="font-weight-bold text-center">\n' + message + '</h5>\n' +
                '            </div>\n' +
                '            <div class="modal-footer justify-content-center">\n' +
                '                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>');
        } else {
            const notificationDialogMessage = document.getElementById('notificationDialogMessage');

            if (notificationDialogMessage !== null) {
                notificationDialogMessage.innerHTML = message;
            }
        }

        PageUtil.showModal('notificationDialog');
    }
}
