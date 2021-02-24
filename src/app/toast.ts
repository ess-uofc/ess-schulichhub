export async function toast(
    header: string,
    message: string,
    position: 'top' | 'bottom' | 'middle' = 'top',
    buttons?: { text: string; role: string; handler: () => void }[],
) {
    const toast = document.createElement('ion-toast');
    toast.header = header;
    toast.message = message;
    toast.position = position;
    toast.buttons = buttons;

    document.body.appendChild(toast);
    return toast.present();
}
