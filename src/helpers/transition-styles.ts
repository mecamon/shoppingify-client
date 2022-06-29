export const modalTransition = {
  duration: 300,
  defaultStyle: {
    transition: `opacity 300ms ease-in-out`,
    opacity: 0,
  },
  transitionStyles: {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  }
}