"use client"

import { EditBeneficiarySheet } from "@/components/beneficiary/edit-beneficiary-sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteBeneficiary } from "@/lib/api/v1/payout/actions"
import { payoutQueryKeys } from "@/lib/api/v1/query-key-factory"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import type { BeneficiaryTableRow } from "@/lib/types"
import { useCurrentMerchant } from "@/store/merchant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

interface BeneficiaryTableActionsProps {
  beneficiary: BeneficiaryTableRow
}

export function BeneficiaryTableActions({
  beneficiary,
}: BeneficiaryTableActionsProps) {
  const merchant = useCurrentMerchant()
  const queryClient = useQueryClient()
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)

  const { mutate: removeBeneficiary, isPending } = useMutation({
    mutationFn: async () => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      return deleteBeneficiary(beneficiary.id, merchant.id)
    },
    onSuccess: async () => {
      if (merchant?.id) {
        await queryClient.invalidateQueries({
          queryKey: payoutQueryKeys.beneficiariesList(merchant.id),
        })
      }

      toast.success("Beneficiary deleted successfully")
      setIsDeleteOpen(false)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to delete beneficiary"))
    },
  })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-text-muted hover:text-text-primary"
          >
            <MoreVertical className="size-4" />
            <span className="sr-only">Open beneficiary actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 p-1">
          <DropdownMenuItem
            className="cursor-pointer p-2 gap-2"
            onSelect={() => setIsEditOpen(true)}
          >
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer p-2 gap-2"
            onSelect={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditBeneficiarySheet
        beneficiary={beneficiary}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete beneficiary?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {beneficiary.name} from your beneficiaries list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={() => removeBeneficiary()}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
