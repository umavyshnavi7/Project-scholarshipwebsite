import { useMemo, useCallback } from 'react';

export const usePerformance = (data, filters) => {
  const filteredData = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) return data;
    
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  const stats = useMemo(() => {
    return {
      total: filteredData.length,
      pending: filteredData.filter(item => item.status === 'pending').length,
      approved: filteredData.filter(item => item.status === 'approved').length,
      totalAmount: filteredData.reduce((sum, item) => sum + (item.amount || 0), 0)
    };
  }, [filteredData]);

  const memoizedCallback = useCallback((id, newStatus) => {
    return { id, status: newStatus, timestamp: Date.now() };
  }, []);

  return { filteredData, stats, memoizedCallback };
};