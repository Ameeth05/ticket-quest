export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketID: string) => `${ticketsPath()}/${ticketID}`;
export const homePath = () => "/";
export const ticketEditPath = (ticketID: string) =>
  `${ticketPath(ticketID)}/edit`;

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";
export const passwordForgotPath = () => "/passford-forgot";
