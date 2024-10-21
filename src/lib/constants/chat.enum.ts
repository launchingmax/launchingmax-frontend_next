export enum ChatType {
  Ticket = "ticket",
  Message = "message",
}

export enum ChatStatus {
  Close = "close",
  Open = "open",
}

export enum TicketStatus {
  Open = "open",

  /**
   * Admin Doing means, admin started his/her task and working on the ticket.
   */
  AdminDoing = "adminDoing",
  /**
   * Admin Close means admin answered and waiting for user response.
   * If user doesn't answer within specified time, this ticket automatically closes.
   */
  AdminClose = "adminClose",
  /**
   * Admin Done means admin performed all necessary tasks. And is waiting for user response or confirmation
   */
  AdminDone = "adminDone",

  /**
   * Close means, this ticket is closed by the user.
   * Close means neither user nor admin can edit or reply this ticket.
   */
  Close = "close",
}
