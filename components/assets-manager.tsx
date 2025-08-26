'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Asset {
  id: string;
  name: string;
  type: string;
  value: string;
  description?: string;
  acquiredDate?: string;
  createdAt: string;
}

export function AssetsManager() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    value: '',
    description: '',
    acquiredDate: '',
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/finance/assets');
      if (!response.ok) throw new Error('Failed to fetch assets');
      const data = await response.json();
      if (data.success) {
        setAssets(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/finance/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          value: parseFloat(formData.value),
        }),
      });

      if (!response.ok) throw new Error('Failed to create asset');
      
      const data = await response.json();
      if (data.success) {
        setFormData({ name: '', type: '', value: '', description: '', acquiredDate: '' });
        fetchAssets(); // Refresh the list
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create asset');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/finance/assets?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete asset');
      
      fetchAssets(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete asset');
    }
  };

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div className="text-destructive">Error: {error}</div>;

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Asset</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Asset Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Savings Account, Car, House"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Asset Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="retirement">Retirement Account</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value ($)</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acquiredDate">Acquired Date (Optional)</Label>
              <Input
                id="acquiredDate"
                type="date"
                value={formData.acquiredDate}
                onChange={(e) => setFormData({ ...formData, acquiredDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about this asset"
            />
          </div>

          <Button type="submit">Add Asset</Button>
        </form>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Acquired</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>
                  <span className="capitalize">
                    {asset.type.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(asset.value)}</TableCell>
                <TableCell>
                  {asset.acquiredDate
                    ? new Date(asset.acquiredDate).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(asset.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {assets.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No assets found. Add your first asset above.
          </div>
        )}
      </div>
    </div>
  );
}