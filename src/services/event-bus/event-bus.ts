const eventBus = {
  on(event: CustomEvents, callback: (data: any) => void) {
    document.addEventListener(event, (e: any) => callback(e.detail));
  },
  dispatch(event: CustomEvents, data: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: CustomEvents, callback: () => void) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;

export type CustomEvents = 'cancelListConfirmation' | 'completeListConfirmation' | 'confirmLogout'