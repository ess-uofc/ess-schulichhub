export async function toast(
    header: string,
    message: string,
    position: 'top' | 'bottom' | 'middle' = 'top',
    duration = 800,
    buttons?: { text: string; role: string; handler: () => void }[],
): Promise<void> {
    const toast = document.createElement('ion-toast');
    toast.header = header;
    toast.message = message;
    toast.position = position;
    toast.buttons = buttons;
    toast.duration = duration;

    document.body.appendChild(toast);
    return toast.present();
}
