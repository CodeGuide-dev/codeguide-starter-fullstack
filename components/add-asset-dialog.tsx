"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useFinance } from "@/contexts/finance-context"
import { Asset } from "@/lib/finance-types"

const assetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(['cash', 'real_estate', 'vehicle', 'personal_item', 'other']),
  currentValue: z.number().min(0, "Value must be positive"),
  description: z.string().optional(),
  location: z.string().optional(),
  purchaseValue: z.number().min(0).optional(),
  purchaseDate: z.string().optional(),
})

type AssetFormData = z.infer<typeof assetSchema>

interface AddAssetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  asset?: Asset
}

const categoryOptions = [
  { value: 'cash', label: 'Cash & Savings' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'personal_item', label: 'Personal Item' },
  { value: 'other', label: 'Other' },
]

export function AddAssetDialog({ open, onOpenChange, asset }: AddAssetDialogProps) {
  const { addAsset, updateAsset } = useFinance()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!asset

  const form = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: asset?.name || "",
      category: asset?.category || 'other',
      currentValue: asset?.currentValue || 0,
      description: asset?.description || "",
      location: asset?.location || "",
      purchaseValue: asset?.purchaseValue || 0,
      purchaseDate: asset?.purchaseDate ? asset.purchaseDate.split('T')[0] : "",
    },
  })

  async function onSubmit(data: AssetFormData) {
    setIsLoading(true)
    try {
      const assetData = {
        ...data,
        currency: "USD",
        lastUpdated: new Date().toISOString(),
      }

      if (isEditing && asset) {
        updateAsset({ ...assetData, id: asset.id })
      } else {
        addAsset(assetData)
      }
      
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Error saving asset:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update asset details' : 'Add a new asset to track your wealth'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Asset name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Value ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank, address, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="purchaseValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Value ($) - Optional</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional details about this asset"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Saving..." : isEditing ? "Update Asset" : "Add Asset"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}