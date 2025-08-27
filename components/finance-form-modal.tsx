"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface FinanceFormModalProps {
  type: "asset" | "investment" | "expense" | "income";
  trigger?: React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: any;
}

const formSchemas = {
  asset: z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["cash", "real_estate", "vehicle", "jewelry", "electronics", "other"]),
    value: z.number().positive("Value must be positive"),
    purchaseDate: z.string().optional(),
    description: z.string().optional(),
  }),
  investment: z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["stocks", "bonds", "mutual_funds", "crypto", "real_estate", "retirement", "other"]),
    amount: z.number().positive("Amount must be positive"),
    currentValue: z.number().positive("Current value must be positive"),
    purchaseDate: z.string(),
    tickerSymbol: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
  }),
  expense: z.object({
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be positive"),
    category: z.enum(["housing", "food", "transportation", "utilities", "healthcare", "entertainment", "education", "clothing", "personal_care", "debt", "savings", "gifts", "other"]),
    date: z.string(),
    isRecurring: z.boolean().default(false),
    recurringFrequency: z.string().optional(),
    notes: z.string().optional(),
  }),
  income: z.object({
    source: z.string().min(1, "Source is required"),
    amount: z.number().positive("Amount must be positive"),
    frequency: z.enum(["weekly", "biweekly", "monthly", "quarterly", "yearly", "one_time"]),
    date: z.string(),
    isRecurring: z.boolean().default(true),
    description: z.string().optional(),
  }),
};

const typeLabels = {
  asset: "Asset",
  investment: "Investment",
  expense: "Expense",
  income: "Income",
};

const typeOptions = {
  asset: [
    { value: "cash", label: "Cash" },
    { value: "real_estate", label: "Real Estate" },
    { value: "vehicle", label: "Vehicle" },
    { value: "jewelry", label: "Jewelry" },
    { value: "electronics", label: "Electronics" },
    { value: "other", label: "Other" },
  ],
  investment: [
    { value: "stocks", label: "Stocks" },
    { value: "bonds", label: "Bonds" },
    { value: "mutual_funds", label: "Mutual Funds" },
    { value: "crypto", label: "Cryptocurrency" },
    { value: "real_estate", label: "Real Estate" },
    { value: "retirement", label: "Retirement" },
    { value: "other", label: "Other" },
  ],
  expense: [
    { value: "housing", label: "Housing" },
    { value: "food", label: "Food" },
    { value: "transportation", label: "Transportation" },
    { value: "utilities", label: "Utilities" },
    { value: "healthcare", label: "Healthcare" },
    { value: "entertainment", label: "Entertainment" },
    { value: "education", label: "Education" },
    { value: "clothing", label: "Clothing" },
    { value: "personal_care", label: "Personal Care" },
    { value: "debt", label: "Debt" },
    { value: "savings", label: "Savings" },
    { value: "gifts", label: "Gifts" },
    { value: "other", label: "Other" },
  ],
  income: [
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
    { value: "one_time", label: "One-time" },
  ],
};

export function FinanceFormModal({
  type,
  trigger,
  onSubmit,
  defaultValues,
}: FinanceFormModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchemas[type]),
    defaultValues: defaultValues || {
      isRecurring: false,
      isActive: true,
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await onSubmit(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add {typeLabels[type]}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit" : "Add New"} {typeLabels[type]}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {type === "asset" && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., House, Car, Savings Account" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typeOptions.asset.map((option) => (
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
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Additional details about this asset" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Similar form fields for other types would go here */}
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : defaultValues ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}