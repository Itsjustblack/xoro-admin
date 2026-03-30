"use client"

import { Pencil, Plus, Search, Trash2, X } from "lucide-react"
import * as React from "react"

import { CategoryForm } from "@/components/category/category-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  createPayoutCategory,
  deletePayoutCategory,
  updatePayoutCategory,
} from "@/lib/api/v1/payout/actions"
import { getPayoutCategories } from "@/lib/api/v1/payout/queries"
import { payoutQueryKeys } from "@/lib/api/v1/query-key-factory"
import { type CategoryFormValues } from "@/lib/schemas/payout"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useCurrentMerchant } from "@/store/merchant"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ShapesIcon2 } from "../icons"

const LABEL_COLORS = [
  "bg-accent-blue",
  "bg-success-2",
  "bg-accent-violet",
  "bg-warning-5",
  "bg-text-muted-2",
]

type View = "list" | "create" | "edit"
const CATEGORY_FORM_ID = "category-form"

const DEFAULT_FORM_VALUES: CategoryFormValues = {
  name: "",
  description: "",
}

const EMPTY_STATE_MESSAGE = "No categories yet. Create one to get started."

function getCategoryColor(category: Category) {
  return LABEL_COLORS[category.id % LABEL_COLORS.length]
}

export function CategoriesSheet() {
  const merchant = useCurrentMerchant()
  const queryClient = useQueryClient()
  const merchantId = merchant?.id ?? ""
  const [view, setView] = React.useState<View>("list")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(
    null,
  )
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: payoutQueryKeys.categories(merchantId),
    queryFn: () => getPayoutCategories(merchant!.id),
    enabled: !!merchant?.id,
  })

  const isListView = view === "list"
  const isEditing = view === "edit"
  const isMutating = isLoading
  const formTitle = view === "create" ? "Create New Category" : "Edit Category"
  const formInitialValues = editingCategory
    ? {
        name: editingCategory.name,
        description: editingCategory.description,
      }
    : DEFAULT_FORM_VALUES
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredCategories = React.useMemo(
    () =>
      categories.filter((category) => {
        if (!normalizedSearchTerm) {
          return true
        }

        return (
          category.name.toLowerCase().includes(normalizedSearchTerm) ||
          category.description.toLowerCase().includes(normalizedSearchTerm)
        )
      }),
    [categories, normalizedSearchTerm],
  )

  const showCreateView = () => {
    setEditingCategory(null)
    setView("create")
  }

  const showEditView = (category: Category) => {
    setEditingCategory(category)
    setView("edit")
  }

  const showListView = () => {
    setEditingCategory(null)
    setView("list")
  }

  const invalidateCategories = React.useCallback(async () => {
    if (!merchantId) {
      return
    }

    await queryClient.invalidateQueries({
      queryKey: payoutQueryKeys.categories(merchantId),
    })
  }, [merchantId, queryClient])

  const { mutate: submitCategory, isPending } = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      if (editingCategory) {
        return updatePayoutCategory(
          editingCategory.id,
          merchant.id,
          values.name,
          values.description,
        )
      }

      return createPayoutCategory(merchant.id, values.name, values.description)
    },
    onSuccess: async () => {
      await invalidateCategories()
      toast.success(
        isEditing ? "Category updated successfully" : "Category created successfully",
      )
      showListView()
    },
    onError: (error) => {
      const message =
        error instanceof Error && error.message === "No merchant selected"
          ? error.message
          : isEditing
            ? "Unable to update category"
            : "Unable to create category"

      toast.error(message)
    },
  })

  const { mutate: removeCategory, isPending: isDeleting } = useMutation({
    mutationFn: async (category: Category) => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      return deletePayoutCategory(category.id, merchant.id)
    },
    onSuccess: async () => {
      await invalidateCategories()
      toast.success("Category deleted successfully")
      showListView()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error && error.message === "No merchant selected"
          ? error.message
          : "Unable to delete category",
      )
    },
  })

  const handleSubmit = React.useCallback(
    (values: CategoryFormValues) => {
      submitCategory(values)
    },
    [submitCategory],
  )

  const handleDelete = React.useCallback(
    (category: Category) => {
      if (
        typeof window !== "undefined" &&
        !window.confirm(`Delete "${category.name}"?`)
      ) {
        return
      }

      removeCategory(category)
    },
    [removeCategory],
  )

  const listEmptyMessage = normalizedSearchTerm
    ? "No categories match your search."
    : EMPTY_STATE_MESSAGE

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center rounded-xl h-auto py-2 px-4 hover:bg-surface-2 gap-2 bg-surface-1 text-text-primary font-medium"
        >
          <ShapesIcon2 className="size-4" />
          <span>Manage Categories</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        showCloseButton={false}
        className="w-full bg-surface-1 p-0 data-[side=right]:sm:max-w-109.75"
      >
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center">
                <SheetTitle className="text-2xl font-bold text-text-primary">
                  Categories
                </SheetTitle>
              </div>
              <SheetDescription className="text-text-secondary text-sm">
                Organize and manage transaction categories for better reporting.
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-text-muted-2 hover:text-text-primary absolute right-4 top-6"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                disabled={!isListView}
                className="pl-9 bg-surface-2 border-transparent focus-visible:ring-1 focus-visible:ring-surface-6 rounded-full h-10 text-text-primary"
              />
            </div>
            <Button
              className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded-2xl px-4 h-10 shadow-sm shadow-brand-primary/20"
              onClick={showCreateView}
              disabled={!isListView}
            >
              <Plus className="h-4 w-4" />
              New Category
            </Button>
          </div>
        </SheetHeader>

        <div className="h-px w-full bg-surface-3" />

        <div className=" py-4 flex-1 overflow-y-auto custom-scrollbar space-y-4">
          {isListView ? (
            <div className="space-y-3 px-6">
              {isLoading ? (
                <div className="rounded-3xl border border-dashed border-surface-6 bg-surface-2 px-4 py-8 text-center text-sm text-text-secondary">
                  Loading categories...
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-surface-6 bg-surface-2 px-4 py-8 text-center text-sm text-text-secondary">
                  {listEmptyMessage}
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className={cn(
                      "group flex items-center gap-4 rounded-3xl h-19.5 border-2 p-4 transition-all",
                      "hover:bg-surface-1 hover:border-brand-primary hover:shadow-sm",
                      "bg-surface-2 border-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "size-3 shrink-0 rounded-full",
                        getCategoryColor(category),
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="min-w-0 flex items-center justify-between">
                          <h4 className="text-base font-bold leading-none text-text-primary">
                            {category.name}
                          </h4>
                          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-text-muted-2 hover:text-brand-primary"
                              onClick={() => showEditView(category)}
                              disabled={isMutating}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-text-muted-2 hover:text-destructive"
                              onClick={() => handleDelete(category)}
                              disabled={isMutating}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs -mt-1 leading-relaxed text-text-secondary">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <CategoryForm
              title={formTitle}
              formId={CATEGORY_FORM_ID}
              initialValues={formInitialValues}
              onCancel={showListView}
              submitLabel={isEditing ? "Save Changes" : "Create Category"}
              onSubmit={handleSubmit}
              isPending={isPending}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
