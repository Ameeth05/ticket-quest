"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import useConfirmDialog from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_ICONS_LABELS } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export default function TicketMoreMenu({
  ticket,
  trigger,
}: TicketMoreMenuProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className=" h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  // const deleteButton = (
  //   <DropdownMenuItem>
  //     <LucideTrash className=" h-4 w-4" />
  //     <span>Delete</span>
  //   </DropdownMenuItem>
  // );

  // const deleteButton = (
  //   <ConfirmDialog
  //     action={deleteTicket.bind(null, ticket.id)}
  //     trigger={
  //       <Button variant="outline" size="icon">
  //         <LucideTrash className="h-4 w-4" />
  //       </Button>
  //     }
  //   />
  // );

  const handleUpdateTicketStatus = async (value: string) => {
    const promiseUpdateTicketStatus = updateTicketStatus(
      ticket.id,
      value as TicketStatus
    );

    toast.promise(promiseUpdateTicketStatus, {
      loading: "updating status...",
    });

    const result = await promiseUpdateTicketStatus;
    if (result.status === "SUCCESS") {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      onValueChange={handleUpdateTicketStatus}
      value={ticket.status}
    >
      {(Object.keys(TICKET_ICONS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_ICONS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {/* <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value={Object.keys(TICKET_ICONS_LABELS)[0]}>
          {TICKET_ICONS_LABELS.OPEN}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Object.keys(TICKET_ICONS_LABELS)[1]}>
          {TICKET_ICONS_LABELS.IN_PROGRESS}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Object.keys(TICKET_ICONS_LABELS)[2]}>
          {TICKET_ICONS_LABELS.DONE}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup> */}
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
