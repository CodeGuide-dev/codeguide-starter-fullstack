"use client";

import { useState, useEffect } from 'react';
import { Asset } from '@/lib/types/finance';
import { createAssetSchema, updateAssetSchema } from '@/lib/validations/finance';
import { z } from 'zod';

interface UseAssetsReturn {
  assets: Asset[];
  isLoading: boolean;
  error: string | null;
  createAsset: (data: z.infer<typeof createAssetSchema>) => Promise<boolean>;
  updateAsset: (id: string, data: z.infer<typeof updateAssetSchema>) => Promise<boolean>;
  deleteAsset: (id: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useAssets(): UseAssetsReturn {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/finance/assets');
      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.status}`);
      }

      const data = await response.json();
      setAssets(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assets');
    } finally {
      setIsLoading(false);
    }
  };

  const createAsset = async (data: z.infer<typeof createAssetSchema>): Promise<boolean> => {
    try {
      const response = await fetch('/api/finance/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create asset');
      }

      const result = await response.json();
      setAssets(prev => [...prev, result.data]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create asset');
      return false;
    }
  };

  const updateAsset = async (id: string, data: z.infer<typeof updateAssetSchema>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/finance/assets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update asset');
      }

      const result = await response.json();
      setAssets(prev => prev.map(asset => asset.id === id ? result.data : asset));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update asset');
      return false;
    }
  };

  const deleteAsset = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/finance/assets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete asset');
      }

      setAssets(prev => prev.filter(asset => asset.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete asset');
      return false;
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    assets,
    isLoading,
    error,
    createAsset,
    updateAsset,
    deleteAsset,
    refetch: fetchAssets,
  };
}