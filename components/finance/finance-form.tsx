"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinanceFormProps {
  title: string;
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  type: 'asset' | 'investment' | 'expense' | 'income';
}

export function FinanceForm({ title, initialData, onSubmit, onCancel, type }: FinanceFormProps) {
  const [formData, setFormData] = useState(initialData || getDefaultData(type));

  function getDefaultData(type: string) {
    switch (type) {
      case 'asset':
        return { name: '', description: '', value: '', currency: 'USD', purchaseDate: '', category: '' };
      case 'investment':
        return { name: '', description: '', type: '', quantity: '', purchasePrice: '', purchaseDate: '', currentPrice: '', currency: 'USD', category: '' };
      case 'expense':
        return { name: '', description: '', amount: '', currency: 'USD', date: '', category: '', paymentMethod: '' };
      case 'income':
        return { name: '', description: '', amount: '', currency: 'USD', date: '', category: '', frequency: '' };
      default:
        return {};
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? `Edit ${title}` : `Add ${title}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            {type === 'investment' && (
              <div className="space-y-2">
                <Label htmlFor="type">Investment Type</Label>
                <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stock">Stock</SelectItem>
                    <SelectItem value="Bond">Bond</SelectItem>
                    <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                    <SelectItem value="ETF">ETF</SelectItem>
                    <SelectItem value="Crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {(type === 'asset' || type === 'investment') && (
              <div className="space-y-2">
                <Label htmlFor="value">
                  {type === 'asset' ? 'Value' : 'Purchase Price'} *
                </Label>
                <Input
                  id="value"
                  name={type === 'asset' ? 'value' : 'purchasePrice'}
                  type="number"
                  step="0.01"
                  value={formData.value || formData.purchasePrice}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            {type === 'investment' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    step="0.0001"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">Current Price</Label>
                  <Input
                    id="currentPrice"
                    name="currentPrice"
                    type="number"
                    step="0.01"
                    value={formData.currentPrice}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            
            {(type === 'expense' || type === 'income') && (
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" value={formData.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {type === 'asset' && (
                    <>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Vehicle">Vehicle</SelectItem>
                      <SelectItem value="Jewelry">Jewelry</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </>
                  )}
                  {type === 'investment' && (
                    <>
                      <SelectItem value="Equity">Equity</SelectItem>
                      <SelectItem value="Fixed Income">Fixed Income</SelectItem>
                      <SelectItem value="Alternative">Alternative</SelectItem>
                      <SelectItem value="Crypto">Cryptocurrency</SelectItem>
                    </>
                  )}
                  {type === 'expense' && (
                    <>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </>
                  )}
                  {type === 'income' && (
                    <>
                      <SelectItem value="Salary">Salary</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}