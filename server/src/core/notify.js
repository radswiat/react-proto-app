import notifier from 'node-notifier';

/**
 * Notify - send notification to OS
 * @param title
 * @param message
 */
export default function notify(title, message) {
  // notifier options
  const options = {
    title,
    message,
    sound: true
  };

  // mac ?
  new notifier.NotificationCenter(options).notify();
  // uni?
  new notifier.NotifySend(options).notify();
  // windows 8 >
  new notifier.WindowsBalloon(options).notify(options);

  // growl, disabled
  // new notifier.Growl(options).notify(options);
}
