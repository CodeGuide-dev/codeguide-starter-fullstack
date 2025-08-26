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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useFinance } from "@/contexts/finance-context"
import { Income } from "@/lib/finance-types"

const incomeSchema = z.object({
  source: z.string().min(1, "Source is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.enum(['salary', 'freelance', 'business', 'passive', 'dividends', 'interest', 'bonus', 'other']),
  frequency: z.enum(['weekly', 'bi_weekly', 'monthly', 'quarterly', 'annually', 'one_time']),
  date: z.string().min(1, "Date is required"),
  isAfterTax: z.boolean(),
  taxWithholding: z.number().min(0).optional(),
  employer: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
})

type IncomeFormData = z.infer<typeof incomeSchema>

interface AddIncomeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  income?: Income
}

const categoryOptions = [
  { value: 'salary', label: 'Salary' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'business', label: 'Business' },
  { value: 'passive', label: 'Passive Income' },
  { value: 'dividends', label: 'Dividends' },
  { value: 'interest', label: 'Interest' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'other', label: 'Other' },
]

const frequencyOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi_weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
  { value: 'one_time', label: 'One-time' },
]

export function AddIncomeDialog({ open, onOpenChange, income }: AddIncomeDialogProps) {
  const { addIncome, updateIncome } = useFinance()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!income

  const form = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      source: income?.source || "",
      amount: income?.amount || 0,
      category: income?.category || 'other',
      frequency: income?.frequency || 'monthly',
      date: income?.date ? income.date.split('T')[0] : new Date().toISOString().split('T')[0],
      isAfterTax: income?.isAfterTax || false,
      taxWithholding: income?.taxWithholding || 0,
      employer: income?.employer || "",
      description: income?.description || "",
      notes: income?.notes || "",
    },
  })

  const watchIsAfterTax = form.watch("isAfterTax")

  async function onSubmit(data: IncomeFormData) {
    setIsLoading(true)
    try {
      const incomeData = {
        ...data,
        currency: "USD",
      }

      if (isEditing && income) {
        updateIncome({ ...incomeData, id: income.id })
      } else {
        addIncome(incomeData)
      }
      
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Error saving income:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Income' : 'Add New Income'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update income details' : 'Add a new income source to track your earnings'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income Source</FormLabel>
                    <FormControl>
                      <Input placeholder="Source name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {frequencyOptions.map((option) => (
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Company or client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-6">
              <FormField
                control={form.control}
                name="isAfterTax"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>After-tax income</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {!watchIsAfterTax && (
              <FormField
                control={form.control}
                name="taxWithholding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Withholding ($)</FormLabel>
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
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional details about this income"
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
                {isLoading ? "Saving..." : isEditing ? "Update Income" : "Add Income"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}