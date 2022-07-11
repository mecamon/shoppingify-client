const eventBus = {
  on(event: CustomEvents, callback: () => void) {
    document.addEventListener(event, callback);
  },
  dispatch(event: CustomEvents) {
    document.dispatchEvent(new CustomEvent(event));
  },
  remove(event: CustomEvents, callback: () =>  void) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;

export type CustomEvents = 'cancelListConfirmation' | 'completeListConfirmation' | 'confirmLogout'