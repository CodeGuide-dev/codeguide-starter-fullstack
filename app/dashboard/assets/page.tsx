"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Wallet, Home, Car, Banknote } from "lucide-react";
import { ASSET_TYPES } from "@/lib/types/finance";

interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  description?: string;
  purchaseDate?: string;
  createdAt: string;
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Primary Residence",
    type: "real_estate",
    value: 450000,
    description: "3BR/2BA house in downtown",
    purchaseDate: "2020-05-15",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2", 
    name: "2019 Honda Civic",
    type: "vehicle",
    value: 18500,
    description: "Reliable daily driver",
    purchaseDate: "2019-03-20",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Emergency Fund",
    type: "savings",
    value: 25000,
    description: "High-yield savings account",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

const getAssetIcon = (type: string) => {
  switch (type) {
    case 'real_estate':
      return <Home className="h-4 w-4" />;
    case 'vehicle':
      return <Car className="h-4 w-4" />;
    case 'savings':
    case 'cash':
      return <Banknote className="h-4 w-4" />;
    default:
      return <Wallet className="h-4 w-4" />;
  }
};

const getAssetTypeLabel = (type: string) => {
  return ASSET_TYPES.find(t => t.value === type)?.label || type;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: "",
    description: "",
    purchaseDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAsset: Asset = {
      id: editingAsset?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      value: parseFloat(formData.value),
      description: formData.description,
      purchaseDate: formData.purchaseDate,
      createdAt: editingAsset?.createdAt || new Date().toISOString(),
    };

    if (editingAsset) {
      setAssets(assets.map(asset => asset.id === editingAsset.id ? newAsset : asset));
      setEditingAsset(null);
    } else {
      setAssets([...assets, newAsset]);
      setIsAddDialogOpen(false);
    }

    setFormData({ name: "", type: "", value: "", description: "", purchaseDate: "" });
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      value: asset.value.toString(),
      description: asset.description || "",
      purchaseDate: asset.purchaseDate || "",
    });
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assets</h1>
          <p className="text-muted-foreground">
            Manage your assets and track their value over time
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
              <DialogDescription>
                Enter the details of your new asset.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Asset name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="value">Value</Label>
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

              <div>
                <Label htmlFor="purchaseDate">Purchase Date (optional)</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this asset"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Asset</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Total Asset Value
          </CardTitle>
          <CardDescription>
            Combined value of all your tracked assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-600">
            ${totalValue.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            Across {assets.length} asset{assets.length !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Portfolio</CardTitle>
          <CardDescription>View and manage all your assets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getAssetIcon(asset.type)}
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        {asset.description && (
                          <div className="text-sm text-muted-foreground">
                            {asset.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getAssetTypeLabel(asset.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${asset.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {asset.purchaseDate 
                      ? new Date(asset.purchaseDate).toLocaleDateString()
                      : "—"
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(asset)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(asset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingAsset && (
        <Dialog open={!!editingAsset} onOpenChange={() => setEditingAsset(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Asset</DialogTitle>
              <DialogDescription>
                Update the details of your asset.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Asset name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-value">Value</Label>
                <Input
                  id="edit-value"
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-purchaseDate">Purchase Date (optional)</Label>
                <Input
                  id="edit-purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description (optional)</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this asset"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingAsset(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Asset</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}